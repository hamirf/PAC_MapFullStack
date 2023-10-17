using System.Text.RegularExpressions;

namespace Pac.Logging.Extensions;

public static class LoggingExtensions
{
  private static readonly Regex RegexBase64 = new(@"[0-9a-zA-Z\+/=]{80,}", RegexOptions.Compiled); // Matches base64 string with length >= 80 characters

  public static string SuppressBase64( this string input )
  {
    return RegexBase64.Replace( input, "<base64>" );
  }
}