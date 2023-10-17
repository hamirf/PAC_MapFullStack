import { Cue, CueMap } from "../Model/CueMapModel";
import { 
    sendGetRequest,
    sendPostRequestReturnValue,
    sendPutRequestReturnValue
} from "../Utility/FetchUtils";
import config from "../config";

class MapCombinerApi {
    static BASE_URL = config.SERVICE_URL + "/MapCombiner";

    static getMap() {
        const url = `${MapCombinerApi.BASE_URL}/combined-map`;
        return sendGetRequest<CueMap>(url);
    }
    
    static combineMap(files: any) {
        const url = `${MapCombinerApi.BASE_URL}/combine-maps`;
        
        return sendPostRequestReturnValue<string>(url, files);
    }
    
    static updateMap(cueId: number, coordinate: Cue) {
        const url = `${MapCombinerApi.BASE_URL}/update-map/${cueId}`;

        return sendPutRequestReturnValue<string>(url, coordinate);
    }

    static updateMapInBatch(coordinates: Cue[]) {
        const url = `${MapCombinerApi.BASE_URL}/batch-update-of-map`;

        return sendPutRequestReturnValue<string>(url, coordinates);
    }
}

export default MapCombinerApi;