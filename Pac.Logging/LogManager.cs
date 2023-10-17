using log4net.Config;
using System.Reflection;

namespace Pac.Logging;

public class LogManager
{
  public static ILog GetLogger( Type type )
  {
    return new Log( log4net.LogManager.GetLogger( type ) );
  }

  public static void Initialize( string fileName )
  {
    XmlConfigurator.ConfigureAndWatch( log4net.LogManager.GetRepository( Assembly.GetCallingAssembly() ), new FileInfo( fileName ) );
  }
}