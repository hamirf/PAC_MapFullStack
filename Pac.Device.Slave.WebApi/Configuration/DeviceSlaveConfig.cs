using System.Xml.Serialization;

namespace Pac.Device.Slave.WebApi.Configuration;

[XmlType( TypeName = "DeviceSlave" )]
public class DeviceSlaveConfig
{
  public DeviceProxyConfig DeviceProxy { get; set; }
  public GroundEncoderMotorConfig MotorX { get; set; }
  public GroundEncoderConfig GroundEncoder { get; set; }
}