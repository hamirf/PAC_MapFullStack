using Pac.Device.Slave.WebApi.Model;
using Pac.Device.Slave.WebApi.Utilities;

namespace Pac.Device.Slave.WebApi.Repositories;

public interface IMapRepository
{
    CueMap? GetCombinedMap();
    string CombineMap( IFormFile[] files );
    string UpdateMap( uint cueId, Cue coordinate );
    string UpdateMapInBatch( Cue[] coordinates );
}