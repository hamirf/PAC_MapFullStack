namespace Pac.Device.Slave.WebApi.Configuration;

public class BaseMotorConfig
{
    public double StepPerUnit { get; set; }
    public double MaxVelocity { get; set; }
    public double Acceleration { get; set; }
    public double Jerk { get; set; }
}