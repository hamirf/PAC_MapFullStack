namespace Pac.Device.Slave.WebApi.Configuration;

public class ConfigExport
{
  public string Name { get; set; }
  public string ConfigXml { get; set; }
  public string Directory { get; set; }
}
  
public class PreferenceExport
{
  public string Name { get; set; }
  public string PreferenceXml { get; set; }
  public string Directory { get; set; }
}

public class ConfigAndPreferencesExport
{
  // public ConfigAndPreferencesExport(){}
  public string ModuleIdentifier { get; set; }
  public ConfigExport[] Configs { get; set; }
  public PreferenceExport[] Preferences { get; set; }
}