using log4net;
using System.Runtime.CompilerServices;

namespace Pac.Logging;

public class NestedDiagnosticContext
{
  public static IDisposable Push( string message )
  {
    return ThreadContext.Stacks["NDC"].Push( message );
  }


  public static IDisposable PushEx( [CallerMemberName] string caller = "" )
  {
    return ThreadContext.Stacks["NDC"].Push( caller );
  }
}