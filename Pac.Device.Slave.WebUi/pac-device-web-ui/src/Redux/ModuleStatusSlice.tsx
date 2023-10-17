import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { FetchStatus } from "../Model/FetchStatus";
import { PacDeviceModuleStatus, PacStatus } from "../Model/ModuleStatus";
import { ScaraHandOrientation } from "../Model/CarrierVector";

// Define a type for the slice state
interface State {
  status: FetchStatus;
  moduleStatus: PacDeviceModuleStatus;
}
// Define the initial state using that type
const initialState: State = {
  status: {
    completed: false,
    pending: false,
    error: null,
  },
  moduleStatus: {
    name: "PAC Device",
    id: 1,
    status: PacStatus.Starting,
    position: {
      carrier: {
        x: 0,
        z: 0,
      },
      scara: {
        x: 0,
        y: 0,
        t: 0,
        orientation: ScaraHandOrientation.Left,
      },
    },
    smartAlignmentStatus: {
      camera: {
        imageWidth: 800,
        imageHeight: 600,
        isStreaming: false,
        isDetectingMarker: false,
        streamServerPort: 2345,
        isSmartAlignment: false
      }
    },
  },
};

export const moduleStatusSlice = createSlice({
  name: "ModuleStatus",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchModuleStatusPending: (state) => {
      state.status = {
        error: null,
        pending: true,
        completed: false,
      };
    },
    fetchModuleStatusSuccess: (
      state,
      action: PayloadAction<PacDeviceModuleStatus>
    ) => {
      state.status = {
        error: null,
        pending: false,
        completed: true,
      };
      state.moduleStatus = action.payload;
    },
    fetchModuleStatusError: (state, action: PayloadAction<any>) => {
      state.status = {
        error: action.payload,
        pending: false,
        completed: true,
      };
    },
    updateModuleStatus: (
      state,
      action: PayloadAction<PacDeviceModuleStatus>
    ) => {
      state.moduleStatus = action.payload;
    },
  },
});

export const {
  fetchModuleStatusPending,
  fetchModuleStatusSuccess,
  fetchModuleStatusError,
  updateModuleStatus,
} = moduleStatusSlice.actions;

export const carrierPositionSelector = (state: RootState) =>
  state.moduleStatusReducer.moduleStatus.position.carrier;

export const smartAlignmentCameraStatusSelector = (state: RootState) =>
  state.moduleStatusReducer.moduleStatus.smartAlignmentStatus.camera;

export const modulePacStatusSelector = (state: RootState) =>
  state.moduleStatusReducer.moduleStatus.status;

export const moduleFetchStatusSelector = (state: RootState) =>
  state.moduleStatusReducer.status;

export const scaraPositionSelector = (state: RootState) =>
  state.moduleStatusReducer.moduleStatus.position.scara;

export const moduleStatusReducer = moduleStatusSlice.reducer;
