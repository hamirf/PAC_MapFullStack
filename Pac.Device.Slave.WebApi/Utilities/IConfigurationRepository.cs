using Pac.Device.Slave.WebApi.Configuration;

namespace Pac.Device.Slave.WebApi.Utilities;

public interface IConfigurationRepository
{
  /// <summary>
  /// Check if specified configuration exists or not.
  /// </summary>
  /// <typeparam name="T">Config type to check.</typeparam>
  /// <returns><c>true</c> if configuration exists, otherwise <c>false</c>.</returns>
  bool ExistsConfiguration<T>() where T : class;

  /// <summary>
  /// Load configuration.
  /// </summary>
  /// <typeparam name="T">Config type.</typeparam>
  /// <returns>Config value.</returns>
  T LoadConfiguration<T>() where T : class;

  /// <summary>
  /// Save configuration.
  /// </summary>
  /// <typeparam name="T">Config type.</typeparam>
  /// <param name="config">Config value.</param>
  void Save<T>( T config ) where T : class;

  /// <summary>
  /// Save configuration.
  /// </summary>
  /// <param name="config">Config value.</param>
  /// <param name="type">Config type.</param>
  void Save( object config, Type type );
    
  void Import( ConfigExport[] configExports);

  ConfigExport[] Export();
}