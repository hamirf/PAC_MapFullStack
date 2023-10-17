import {
  PacVector
} from "../Model/CarrierVector";
import { RepeatabilityCarrier } from "../Model/RepeatabilityModel";
import { sendGetRequest, sendPostRequest } from "../Utility/FetchUtils";
import config from "../config";

class PacDeviceApi {
  static BASE_URL = config.SERVICE_URL + "/pac-device";

  static movePacVector(vector: PacVector) {
    const url = `${PacDeviceApi.BASE_URL}/:move-vector`;
    return sendPostRequest(url, vector);
  }

  static stopAllMotor() {
    const url = `${PacDeviceApi.BASE_URL}/:stop-all-motor`;
    return sendPostRequest(url);
  }

  static checkRepeatability(repeat: RepeatabilityCarrier) {
    const url = `${PacDeviceApi.BASE_URL}/:check-repeatability`;
    return sendPostRequest(url,repeat);
  }

}

export default PacDeviceApi;