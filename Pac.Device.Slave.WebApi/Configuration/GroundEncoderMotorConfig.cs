using System.Xml.Serialization;

namespace Pac.Device.Slave.WebApi.Configuration;

[XmlType(TypeName = "GroundEncoderMotor")]
public class GroundEncoderMotorConfig : BaseMotorConfig
{
  public int ID { get; set; }
  public string Driver { get; set; }
  public bool Simulation { get; set; }
  public double DeadBand { get; set; }
  
  public bool UseLegacyMovement { get; set; }
}
