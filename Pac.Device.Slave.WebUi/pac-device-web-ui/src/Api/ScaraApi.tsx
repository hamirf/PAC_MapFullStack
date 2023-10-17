import {
    ScaraCoordinate
  } from "../Model/CarrierVector";
import { RepeatabilityScara } from "../Model/RepeatabilityModel";
  import { sendGetRequest, sendPostRequest } from "../Utility/FetchUtils";
  import config from "../config";
  
  class ScaraApi {
    static BASE_URL = config.SERVICE_URL + "/scara";
  
    static armStop(imagerIdentifier: string) {
      const url = `${ScaraApi.BASE_URL}/${imagerIdentifier}/:arm-stop`;
  
      return sendPostRequest(url);
    }
  
    static armMoveAbsolute(vector: ScaraCoordinate, velocity: Number) {
      const url = `${ScaraApi.BASE_URL}/:arm-move-to-absolute-position/${velocity}`;
      return sendPostRequest(url, vector);
    }

    static checkRepeatability(vector: RepeatabilityScara){
      const url = `${ScaraApi.BASE_URL}/:check-repeatability`;
      return sendPostRequest(url, vector);
    }
  }
  
  export default ScaraApi;
  