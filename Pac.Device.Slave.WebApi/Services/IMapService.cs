using Pac.Device.Slave.WebApi.Model;

namespace Pac.Device.Slave.WebApi.Services;

public interface IMapService
{
    CueMap? GetCombinedMap();
    string CombineMap( IFormFile[] files );
    string UpdateMap( uint id, Cue coordinate );
    string UpdateMapInBatch( Cue[] coordinates );
}