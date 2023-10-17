using Microsoft.Extensions.Logging;
using System.Reflection;

namespace Pac.Logging
{
  public class FmlxLogger<T> : ILogger<T>
  {
    private static readonly ILog _log = LogManager.GetLogger( MethodBase.GetCurrentMethod().DeclaringType );

    public IDisposable BeginScope<TState>( TState state )
    {
      return null;
    }

    public bool IsEnabled( LogLevel logLevel )
    {
      switch( logLevel )
      {
        case LogLevel.Critical:
          return _log.IsFatalEnabled;
        case LogLevel.Debug:
        case LogLevel.Trace:
          return _log.IsDebugEnabled;
        case LogLevel.Error:
          return _log.IsErrorEnabled;
        case LogLevel.Information:
          return _log.IsInfoEnabled;
        case LogLevel.Warning:
          return _log.IsWarnEnabled;
        default:
          throw new ArgumentOutOfRangeException( nameof( logLevel ) );
      }
    }

    public void Log<TState>( LogLevel logLevel, EventId eventId, TState state,
       Exception exception, Func<TState, Exception, string> formatter )
    {
      if( !IsEnabled( logLevel ) )
      {
        return;
      }

      if( formatter == null )
      {
        throw new ArgumentNullException( nameof( formatter ) );
      }
      string message = null;
      if( null != formatter )
      {
        message = formatter( state, exception );
      }
      if( !string.IsNullOrEmpty( message ) || exception != null )
      {
        switch( logLevel )
        {
          case LogLevel.Critical:
            _log.Fatal( message );
            break;
          case LogLevel.Debug:
          case LogLevel.Trace:
            _log.Debug( message );
            break;
          case LogLevel.Error:
            _log.Error( message );
            break;
          case LogLevel.Information:
            _log.Info( message );
            break;
          case LogLevel.Warning:
            _log.Warn( message );
            break;
          default:
            _log.Warn( $"Encountered unknown log level {logLevel}, writing out as Info." );
            _log.Info( message, exception );
            break;
        }
      }
    }

    //public void LogInfo( string format, params object[] args )
    //{
    //  Log.InfoFormat( format, args );
    //}

    //public void LogWarn( string format, params object[] args )
    //{
    //  Log.WarnFormat( format, args );
    //}

    //public void LogError( string format, params object[] args )
    //{
    //  Log.ErrorFormat( format, args );
    //}

    //public void LogDebug( string format, params object[] args )
    //{
    //  Log.DebugFormat( format, args );
    //}

    //public void LogException( Exception exception )
    //{
    //  Log.Error( exception.Message, exception );
    //}

    //public void LogException( Exception exception, string format, params object[] args )
    //{
    //  Log.Error( string.Format( format, args ), exception );
    //}

    //public void LogUserAction( string format, params object[] args )
    //{
    //  Log.InfoFormat( format, args );
    //}

    //void ILogger.Log<TState>( LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter )
    //{
    //  throw new NotImplementedException();
    //}

    //public bool IsEnabled( LogLevel logLevel )
    //{
    //  throw new NotImplementedException();
    //}

    //public IDisposable BeginScope<TState>( TState state )
    //{
    //  throw new NotImplementedException();
    //}
  }
}