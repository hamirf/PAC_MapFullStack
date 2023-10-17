import { CarrierCoordinate, PacCoordinate, ScaraCoordinate } from "./CarrierVector";

export interface PacDeviceModuleStatus {
  name: string;
  id: number;
  status: PacStatus;
  position: PacCoordinate;
  smartAlignmentStatus: SmartAlignmentStatus;
}

export interface SmartAlignmentStatus {
  camera: SmartAlignmentCameraStatus;
}

export interface SmartAlignmentCameraStatus {
  imageWidth: number;
  imageHeight: number;
  isStreaming: boolean;
  isDetectingMarker: boolean;
  streamServerPort: number;
  isSmartAlignment: boolean;
}

export enum PacStatus {
  Starting = 0,
  Idle = 1,
  Running = 2,
  Failed = 3
}