using Microsoft.AspNetCore.Mvc;
using Pac.Device.Slave.WebApi.Model;
using Pac.Device.Slave.WebApi.Services;

namespace Pac.Device.Slave.WebApi.Controllers;

[ApiController]
[Route( "api/[controller]" )]
public class MapCombinerController : ControllerBase
{
    private readonly IMapService _mapService;
    
    public MapCombinerController( IMapService mapService )
    {
        _mapService = mapService;
    }

    [HttpGet( "combined-map", Name = "GetCombinedMap" )]
    public ActionResult<CueMap?> GetMap()
    {
        return _mapService.GetCombinedMap();
    }

    [HttpPost( "combine-maps", Name = "CombineMap" )]
    public ActionResult<string> CombineMap( IFormFile[] files )
    {
        return _mapService.CombineMap( files );
    }
    
    [HttpPut( "update-map/{cueId}", Name = "UpdateMap" )]
    public ActionResult<string> UpdateMapById( uint cueId, [FromBody] Cue coordinate )
    {
        return _mapService.UpdateMap(cueId, coordinate);
    }
    
    [HttpPut( "batch-update-of-map", Name = "BatchUpdateOfMap" )]
    public ActionResult<string> UpdateMapInBatch( [FromBody] Cue[] coordinates )
    {
      return _mapService.UpdateMapInBatch( coordinates );
    }
}