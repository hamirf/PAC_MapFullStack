using Pac.Device.Slave.WebApi.Repositories;
using Pac.Device.Slave.WebApi.Services;
using Pac.Logging;
using System.Reflection;
using Pac.Device.Slave.WebApi.Configuration;
using Pac.Device.Slave.WebApi.Utilities;

const string CONFIG_DIR = "Configuration";
const string _myAllowSpecificOrigins = "AllowCors";

var builder = WebApplication.CreateBuilder( args );

//-------------Initialize Log----------------//
var systemConfigDir = Path.Combine( Path.GetDirectoryName( Assembly.GetExecutingAssembly().Location ), CONFIG_DIR );
LogManager.Initialize( Path.Combine( systemConfigDir, "LogConfig.xml" ) );
var log = LogManager.GetLogger( MethodBase.GetCurrentMethod().DeclaringType );

//-------------System Config----------------//
var systemConfigurationRepository = new XmlConfigurationRepository( systemConfigDir );
var systemConfig = systemConfigurationRepository.LoadConfiguration<SystemConfig>();

//-------------Device Config----------------//
var deviceConfigurationRepository = new XmlConfigurationRepository( systemConfig.ConfigDirectory );
DeviceSlaveConfig deviceSlaveConfig = deviceConfigurationRepository.LoadConfiguration<DeviceSlaveConfig>();

//-------------Map Combiner-------------//
IMapRepository mapRepository = new MapRepository( deviceSlaveConfig.GroundEncoder.NativeConfig );
IMapService mapService = new MapService( mapRepository );

//-------------Service Registration----------------//
builder.Services.AddSingleton( mapRepository );
builder.Services.AddSingleton( mapService );
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors( options =>
{
  options.AddPolicy( _myAllowSpecificOrigins,
    policy => policy.SetIsOriginAllowed( a => true )
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials() );
} );

var app = builder.Build();

// Configure the HTTP request pipeline.
if( app.Environment.IsDevelopment() )
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors( _myAllowSpecificOrigins );

app.MapControllers();

app.Run();