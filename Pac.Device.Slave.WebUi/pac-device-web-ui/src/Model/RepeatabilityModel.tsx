import { CarrierVector, PacVector, ScaraVector } from "./CarrierVector";

export interface RepeatabilityCarrier{
    startposition: PacVector;
    endPosition: PacVector;
    iteration: number;
}

export interface RepeatabilityScara{
    startposition: ScaraVector;
    endPosition: ScaraVector;
    iteration: number;
}