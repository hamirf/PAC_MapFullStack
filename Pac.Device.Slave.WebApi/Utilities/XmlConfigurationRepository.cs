using System.Reflection;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using Pac.Device.Slave.WebApi.Configuration;
using Pac.Logging;

namespace Pac.Device.Slave.WebApi.Utilities;

internal class ConfigurationPath
  {
    public ConfigurationPath( string rootPath, string childPath, string fileName )
    {
      RootPath = rootPath;
      ChildPath = childPath;
      FileName = fileName;
    }

    public string RootPath { get; }
    public string ChildPath { get; }
    public string FileName { get; }

    public string FullPath
    {
      get
      {
        string fileName = FileName ?? "";
        return Path.Combine( RootPath, ChildPath, fileName );
      }
    }
  }

  internal class Config
  {
    public ConfigurationPath Path { get; set; }
    public Type Type { get; set; }
    public object ConfigObject { get; set; }
  }

  public class XmlConfigurationRepository : IConfigurationRepository
  {
    private const string FILE_NAME_EXTENSION = "xml";
    private const string FILE_NAME_POSTFIX = "Config";

    private static readonly ILog _log = LogManager.GetLogger( MethodBase.GetCurrentMethod().DeclaringType );

    private readonly string _rootPath;
    private readonly string _childPath;

    private readonly List<Config> _configs;

    public XmlConfigurationRepository( string rootPath )
    {
      _rootPath = rootPath ?? throw new ArgumentNullException( nameof(rootPath) );
      _childPath = String.Empty;
      _configs = new List<Config>();
    }

    public XmlConfigurationRepository( string rootPath, string childPath )
    {
      _rootPath = rootPath ?? throw new ArgumentNullException( nameof(rootPath) );
      _childPath = childPath ?? throw new ArgumentNullException( nameof(childPath) );
      _configs = new List<Config>();
    }

    public string WorkingDirectory
    {
      get
      {
        return Path.GetFullPath( Path.Combine( _rootPath, _childPath ) );
      }
    }

    public bool ExistsConfiguration<T>() where T : class
    {
      string configDirectory = Path.Combine( _rootPath, _childPath );
      string file = Path.Combine( configDirectory, string.Concat( typeof(T).Name, ".", FILE_NAME_EXTENSION ) );
      return File.Exists( file );
    }

    public T LoadConfiguration<T>() where T : class
    {
      return LoadConfiguration<T>( string.Concat( typeof(T).Name, ".", FILE_NAME_EXTENSION ) );
    }

    public void Save<T>( T config ) where T : class
    {
      Save( config, typeof(T) );
    }

    public void Save( object config, Type type )
    {
      var configObj = _configs.FirstOrDefault( c => c.ConfigObject == config );
      if( configObj == null )
      {
        throw new InvalidOperationException( "File not set" );
      }

      lock( config )
      {
        string file = configObj.Path.FullPath;
        Console.WriteLine( "Saving {0}", file );

        var xmlDocument = new XmlDocument();
        var serializer = new XmlSerializer( type );

        using( var stream = new MemoryStream() )
        {
          serializer.Serialize( stream, config );
          stream.Position = 0;
          xmlDocument.Load( stream );
          xmlDocument.Save( file );
          stream.Close();
        }
      }
    }

    public void Import( ConfigExport[] configExports )
    {
      foreach( var configExport in configExports )
      {
        string childDirectory = configExport.Directory is null ? "" : configExport.Directory;
        string configDirectory = Path.Combine( _rootPath, childDirectory );
        Directory.CreateDirectory( configDirectory );
        string file = Path.Combine( configDirectory, string.Concat( configExport.Name, ".", FILE_NAME_EXTENSION ) );
        XDocument doc = XDocument.Parse( configExport.ConfigXml );
        doc.Save( file );
      }
    }

    public ConfigExport[] Export()
    {
      return _configs.Select( c => new ConfigExport() { Name = c.Type.Name, ConfigXml = SerializeConfig( c ), Directory = _childPath } ).ToArray();
    }

    private static string SerializeConfig( Config config )
    {
      XmlSerializer xmlSerializer = new XmlSerializer( config.Type );

      using( StringWriter textWriter = new StringWriter() )
      {
        xmlSerializer.Serialize( textWriter, config.ConfigObject );
        return textWriter.ToString();
      }
    }

    public void Create<T>( T config )
    {
      string configDirectory = Path.Combine( _rootPath, _childPath );
      string file = Path.Combine( configDirectory, string.Concat( config.GetType().Name, ".", FILE_NAME_EXTENSION ) );
      _log.InfoFormat( "Saving {0}", file );

      var xmlDocument = new XmlDocument();
      var serializer = new XmlSerializer( typeof(T) );

      using( var stream = new MemoryStream() )
      {
        serializer.Serialize( stream, config );
        stream.Position = 0;
        xmlDocument.Load( stream );
        xmlDocument.Save( file );
        stream.Close();
      }
    }

    private T LoadConfiguration<T>( string file ) where T : class
    {
      string configDirectory = Path.Combine( _rootPath, _childPath );
      file = Path.Combine( configDirectory, file );

      var configObj = _configs.FirstOrDefault( c => c.Path.FullPath == file );

      if( configObj != null )
      {
        return configObj.ConfigObject as T;
      }

      _log.InfoFormat( "Loading {0}", Path.GetFullPath( file ) );

      XmlRootAttribute xRoot = new XmlRootAttribute();
      xRoot.ElementName = typeof(T).Name.Replace( FILE_NAME_POSTFIX, string.Empty );
      xRoot.IsNullable = true;

      var serializer = new XmlSerializer( typeof(T), xRoot );

      using( var reader = new StreamReader( file ) )
      {
        var config = (T)serializer.Deserialize( reader );

        if( config == null )
        {
          throw new InvalidOperationException( "Failed to deserialize XML" );
        }

        _configs.Add( new Config()
        {
          Path = new ConfigurationPath(
            fileName: file, 
            rootPath: _rootPath, 
            childPath: _childPath
          ), Type = typeof(T), ConfigObject = config,
        } );
        return config;
      }
    }
  }