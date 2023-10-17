import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Action, AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import config from "../config";
import { ENotificationType } from "../Model/ENotificationType";
import { PacDeviceModuleStatus } from "../Model/ModuleStatus";
import { removeNotification, sendNotification } from "./NotificationSlice";
import {
  fetchModuleStatusPending,
  moduleStatusSlice,
  updateModuleStatus,
} from "./ModuleStatusSlice";

function startSignalRConnection(
  sendErrorNotification: boolean,
  connection: HubConnection,
  dispatch: Dispatch<AnyAction>
) {
  connection
    .start()
    .then(() => {
      console.info("SignalR Connected");
      dispatch(removeNotification());
    })
    .catch((err) => {
      if (sendErrorNotification) {
        const message = "SignalR Connection Error: " + err;
        dispatch(sendNotification(ENotificationType.Error, message));
      }
      setTimeout(() => {
        console.log("SignalR connection restarted");
        startSignalRConnection(false, connection, dispatch);
      }, 5000);
    });
}

const signalRMiddleware: Middleware =
  (api: MiddlewareAPI) => (next: Dispatch) => (action: Action<string>) => {
    if (moduleStatusSlice.actions.fetchModuleStatusPending.match(action)) {
      // if (action.type === "FETCH_MODULE_STATUS_PENDING") {
      const url = config.SIGNALR_URL + "/push";

      // create the connection instance
      const connection = new HubConnectionBuilder().withUrl(url).build();

      const OnModuleStatusChanged = (moduleStatus: PacDeviceModuleStatus) => {
        api.dispatch(updateModuleStatus(moduleStatus));
      };

      // const OnModuleStateChanged = (moduleState: ModuleState) => {
      //   api.dispatch(updateModuleState(moduleState));
      // };

      // const OnTemperatureChanged = (moduleTemperatureChanges: ModuleTemperatureChange[]) => {
      //   api.dispatch(updateTemperatureReading(moduleTemperatureChanges));
      // };

      // const OnPlateAddressesUpdated = (plateAddresses: PlateAddress[]) => {
      //   api.dispatch(updatePlateAddresses(plateAddresses));
      // };

      // const OnScheduledPlatesUpdated = (imagingSchedules: ScheduleEntry[]) => {
      //   api.dispatch(scheduledPlatesUpdated(imagingSchedules));
      // };

      // const OnQueuedPlatesUpdated = (imagingSchedules: ScheduleEntry[]) => {
      //   api.dispatch(queuedPlatesUpdated(imagingSchedules));
      // };

      // const OnLocateDropCompleted = (locateDropCompletedEventArgs: LocateDropCompleted) => {
      //   api.dispatch(updateModuleLocateDropState(locateDropCompletedEventArgs));
      // };

      // const OnAutoFocusCompleted = (autoFocusCompletedEventArgs: AutoFocusCompleted) => {
      //   api.dispatch(updateModuleAutoFocusState(autoFocusCompletedEventArgs));
      // };

      // const OnModuleDiagnosticFinished = (diagnosticResult: ModuleDiagnosticInfo) => {
      //   api.dispatch(updateDiagnostic(diagnosticResult));
      // };

      // const OnHistogramUpdated = (histogramData: HistogramData) => {
      //   api.dispatch(setHistogramData(histogramData));
      // };

      // const OnNotifyUser = (type: ENotificationType, message: string) => {
      //   api.dispatch(sendNotification(type, message));
      // };

      // const OnUserLoggedIn = () => {
      //   setTimeout(() => {
      //     SuiteApi.getStates();
      //   }, 1000);
      // };

      // event handlers, you can use these to dispatch actions to update your Redux store
      connection.on("OnModuleStatusChanged", OnModuleStatusChanged);
      // connection.on("OnModuleStateChanged", OnModuleStateChanged);
      // connection.on("OnPlateAddressesUpdated", OnPlateAddressesUpdated);
      // connection.on("OnTemperatureChanged", OnTemperatureChanged);
      // connection.on("OnScheduledPlatesUpdated", OnScheduledPlatesUpdated);
      // connection.on("OnQueuedPlatesUpdated", OnQueuedPlatesUpdated);
      // connection.on("OnLocateDropCompleted", OnLocateDropCompleted);
      // connection.on("OnAutoFocusCompleted", OnAutoFocusCompleted);
      // connection.on("OnModuleDiagnosticFinished", OnModuleDiagnosticFinished);
      // connection.on("OnHistogramUpdated", OnHistogramUpdated);
      // connection.on("NotifyUser", OnNotifyUser);
      // connection.on("OnUserLoggedIn", OnUserLoggedIn);

      // re-establish the connection if connection dropped
      connection.onclose(() => {
        console.log("SignalR connection lost");
        setTimeout(() => {
          console.log("SignalR connection restarted");
          startSignalRConnection(true, connection, api.dispatch);
        }, 5000);
      });

      startSignalRConnection(true, connection, api.dispatch);
    }
    return next(action);
  };

export default signalRMiddleware;
