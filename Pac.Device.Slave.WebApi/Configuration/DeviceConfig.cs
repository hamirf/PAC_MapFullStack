using System.Xml.Serialization;

namespace Pac.Device.Slave.WebApi.Configuration;
[XmlType( TypeName = "Device" )]
public class DeviceConfig
{
  public SimulationConfig Simulation { get; set; }
}