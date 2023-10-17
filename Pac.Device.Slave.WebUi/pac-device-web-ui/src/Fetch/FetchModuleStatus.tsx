import {
  fetchModuleStatusError,
  fetchModuleStatusPending,
  fetchModuleStatusSuccess,
} from "../Redux/ModuleStatusSlice";
import ModuleApi from "../Api/ModuleApi";
import { AppDispatch } from "../Redux/Store";

export function fetchModuleStatus() {
  return (dispatch: AppDispatch) => {
    dispatch(fetchModuleStatusPending());
    ModuleApi.getStatus()
      .then((moduleStatus) => {
        dispatch(fetchModuleStatusSuccess(moduleStatus));
      })
      .catch((error) => {
        dispatch(fetchModuleStatusError(error));
      });
  };
}