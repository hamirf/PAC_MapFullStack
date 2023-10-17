import { PacDeviceModuleStatus } from "../Model/ModuleStatus";
import { sendGetRequest } from "../Utility/FetchUtils";
import config from "../config";

class ModuleApi {
    static BASE_URL = config.SERVICE_URL + "/pac-device";
  
    static getStatus():Promise<PacDeviceModuleStatus> {
      const url = `${ModuleApi.BASE_URL}/status`;
  
      return sendGetRequest<PacDeviceModuleStatus>(url);
    }
}  


export default ModuleApi;