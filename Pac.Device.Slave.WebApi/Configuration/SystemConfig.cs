using System.Xml.Serialization;

namespace Pac.Device.Slave.WebApi.Configuration;

[XmlType( TypeName = "System" )]
public class SystemConfig
{
  public string ConfigDirectory { get; set; } 
  public string ConnectionString { get; set; }

  /// <summary>
  /// RobotName
  /// <para>This property specify robot name for integration service (LIMS) and product name for application license.</para>
  /// </summary>
  public string InstrumentId { get; set; }

  /// <summary>
  /// PrettyName
  /// </summary>
  public string InstrumentName { get; set; }

  public string ListenUrl { get; set; }

}