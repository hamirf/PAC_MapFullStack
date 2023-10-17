export enum ECarrierAxis {
  x = 0,
  z = 2,
}

export enum ECarrierAxisDirection {
  xPositive = 0,
  xNegative = 1,
  zPositive = 4,
  zNegative = 5,
}

export enum EScaraAxis {
  x = 0,
  y = 1,
  t = 3,
}

export enum EPacAxis {
  x_carrier = 0,
  z = 1,
  x_scara = 2,
  y = 3,
  t = 4,
}

export interface CarrierVelocity {
  x: number;
  z: number;
}

export interface PacVelocity {
  x: number;
  y: number;
  z: number;
  t: number;
}

export interface PacVector {
  name: string;
  carrierVector: CarrierVector;
  scaraVector: ScaraVector;
}

export interface CarrierVector {
  coordinate: CarrierCoordinate;
  velocity: CarrierVelocity;
}

export interface ScaraVector {
  coordinate: ScaraCoordinate;
  velocity: number;
}

export interface CarrierCoordinate {
  x: number;
  z: number;
}

export enum ScaraHandOrientation {
  Right = 0,
  Left = 1,
}

export interface ScaraCoordinate {
  orientation: ScaraHandOrientation;
  x: number;
  y: number;
  t: number;
}

export interface PacCoordinate {
  carrier: CarrierCoordinate;
  scara: ScaraCoordinate;
}

export enum ECarrierDirection {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}

export enum ESpeed {
  Unknown = 0,
  Slow = 1,
  SlowMedium = 2,
  Medium = 3,
  MediumFast = 4,
  Fast = 5,
}

export interface PacGripper {
  orientation: GripperOrientation;
}

export enum GripperOrientation {
  horizontal = 0,
  vertical = 1,
}
