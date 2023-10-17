export enum EResultCode {
  Unknown= 0, //initial state
  Ok= 1, //command is eligible to be executed.
  Warning= 100, //used for command is eligible to be executed, however some circumstances not meet expectations
  Fail= 200, //used for cannot execute command due to known reason
  Error= 300, //used for cannot execute command due to unknown reason
};

export interface Result<T> {
  resultCode: EResultCode;
  value?: T;
  description?: string;
}
