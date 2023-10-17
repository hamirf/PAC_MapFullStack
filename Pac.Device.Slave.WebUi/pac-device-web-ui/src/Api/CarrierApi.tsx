import {
  CarrierCoordinate,
  CarrierVector,
  ECarrierAxis,
  ECarrierAxisDirection,
} from "../Model/CarrierVector";
import { RepeatabilityCarrier } from "../Model/RepeatabilityModel";
import { sendGetRequest, sendPostRequest } from "../Utility/FetchUtils";
import config from "../config";

class CarrierApi {
  static BASE_URL = config.SERVICE_URL + "/carrier";
  // static BASE_URL_DEVICE = config.SERVICE_URL + "/pac-device";

  static armStop(imagerIdentifier: string) {
    const url = `${CarrierApi.BASE_URL}/${imagerIdentifier}/:arm-stop`;

    return sendPostRequest(url);
  }

  static armMoveToTravelLimit(direction: ECarrierAxisDirection, speed: number) {
    const url = `${CarrierApi.BASE_URL}/:arm-move-to-travel-limit/${direction}/${speed}`;
    return sendPostRequest(url);
  }

  static armMoveAbsolute(vector: CarrierVector) {
    const url = `${CarrierApi.BASE_URL}/:arm-move-to-absolute-position`;
    return sendPostRequest(url, vector);
  }

  static armAxisMoveAbsolute(
    axis: ECarrierAxis,
    position: number,
    velocity: number
  ) {
    const url = `${CarrierApi.BASE_URL}/:arm-axis-move-to-absolute-position/${axis}/${position}/${velocity}`;
    return sendPostRequest(url);
  }

  static home() {
    const url = `${CarrierApi.BASE_URL}/:home`;
    return sendPostRequest(url);
  }

  static releaseMotor() {
    const url = `${CarrierApi.BASE_URL}/:release-motor`;
    return sendPostRequest(url);
  }

  static engageMotor() {
    const url = `${CarrierApi.BASE_URL}/:engage-motor`;
    return sendPostRequest(url);
  }

  static getArmAbsolutePosition() {
    const url = `${CarrierApi.BASE_URL}/arm-absolute-position`;
    return sendGetRequest<CarrierCoordinate>(url);
  }

}

export default CarrierApi;
