import { sendPostRequest } from "../Utility/FetchUtils";
import config from "../config";

class SmartAlignmentCameraApi {
    static BASE_URL = config.SERVICE_URL + "/smart-alignment-controller";
  
    static setStreaming(enabled:boolean) {
      const url = `${SmartAlignmentCameraApi.BASE_URL}/streaming/${enabled}`;
  
      return sendPostRequest(url);
    }

    static setDetectingMarker(enabled:boolean) {
      const url = `${SmartAlignmentCameraApi.BASE_URL}/detecting-marker/${enabled}`;
  
      return sendPostRequest(url);
    }

    
    static setDoSmartaligment(enabled:boolean) {
      const url = `${SmartAlignmentCameraApi.BASE_URL}/do-smartaligment/${enabled}`;
  
      return sendPostRequest(url);
    }
}  


export default SmartAlignmentCameraApi;