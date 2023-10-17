namespace Pac.Logging;

public class LogId
{
  private readonly Guid _guid = Guid.NewGuid();

  public static LogId NewLogId()
  {
    return new LogId();
  }

  public override string ToString()
  {
    // WARNING! Prone to collision (1 duplicate in 100k). 
    // Use sparingly, strictly for logging.
    // https://stackoverflow.com/a/1344365

    return _guid.ToString().Substring( 0, 8 );
  }
}