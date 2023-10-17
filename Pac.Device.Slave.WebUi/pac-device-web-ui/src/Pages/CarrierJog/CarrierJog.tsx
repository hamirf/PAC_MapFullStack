import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import {
  FmlxMotionControlPadCheckBoxProps,
  FmlxMotionControlPadMovement,
  FmlxSlider,
} from "fmlx-common-ui";
import React, { useEffect, useRef, useState } from "react";
import MotionControlPad, {
  EMotionPadDirection,
} from "../../Component/MotionControlPad/MotionControlPad";
import { ECarrierDirection } from "../../Model/CarrierVector";
import { ENotificationType } from "../../Model/ENotificationType";
import { useAppSelector } from "../../Redux/Hook";
import { carrierPositionSelector } from "../../Redux/ModuleStatusSlice";
import { sendNotification } from "../../Redux/NotificationSlice";
import config from "../../config";
import "./CarrierJog.css";

interface HubRefParams {
  hubConnection: HubConnection | null;
}

const startSignalRConnection = (connection: HubConnection) =>
  connection
    .start()
    .then(() => {
      console.info("Arm SignalR Connected");
    })
    .catch((err) => {
      console.info("Arm SignalR Error", { err });
      sendNotification(
        ENotificationType.Error,
        "Arm SignalR Connection Error: " + err
      );
    });

const CARRIER_JOG_ARM_SPEED = "CARRIER_JOG_ARM_SPEED";

function getSpeed(key: string) {
  const value = localStorage.getItem(key);
  if (value != null) {
    return Number.parseInt(value);
  } else {
    return 30;
  }
}

export default function CarrierJog() {
  const [speed, setSpeed] = useState(getSpeed(CARRIER_JOG_ARM_SPEED));
  const carrierPosition = useAppSelector(carrierPositionSelector);

  useEffect(() => {
    localStorage.setItem(CARRIER_JOG_ARM_SPEED, speed.toString());
  }, [speed]);

  const hubRef = useRef<HubRefParams>({ hubConnection: null });

  useEffect(() => {
    const urlConnection = config.SIGNALR_URL + "/arm";
    const hubConnection = new HubConnectionBuilder()
      .withUrl(urlConnection)
      .build();
    hubRef.current.hubConnection = hubConnection;

    hubConnection.onclose(() => {
      console.log("Arm SignalR connection lost");
      setTimeout(() => {
        console.log("Arm SignalR connection restarted");
        if (hubConnection != null) {
          startSignalRConnection(hubConnection);
        }
      }, 5000);
    });

    startSignalRConnection(hubConnection);

    return () => {
      hubConnection?.stop();
    };
  }, []);

  const onMouseUp = () => {
    hubRef.current.hubConnection?.send("CarrierArmStop");
  };

  const onMouseDown = (direction: EMotionPadDirection) => {
    console.log("motion pad direction:", direction);
    let success = true;
    let carrierDirection: ECarrierDirection = ECarrierDirection.Up;
    switch (direction) {
      case EMotionPadDirection.East: {
        carrierDirection = ECarrierDirection.Right;
        break;
      }
      case EMotionPadDirection.West: {
        carrierDirection = ECarrierDirection.Left;
        break;
      }
      case EMotionPadDirection.North: {
        carrierDirection = ECarrierDirection.Up;
        break;
      }
      case EMotionPadDirection.South: {
        carrierDirection = ECarrierDirection.Down;
        break;
      }
      default: {
        success = false;
      }
    }

    if (!success) {
      return;
    }

    hubRef.current.hubConnection?.send(
      "CarrierArmMoveToTravelLimit",
      carrierDirection,
      speed
    );
  };

  return (
    <div className="carrier-jog-container">
      <div className="carrier-jog-motion-pad">
        <MotionControlPad
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          show={{
            center: false,
            eastWest: true,
            northSouth: true,
            upDown: false,
          }}
          label={{
            eastWest: "X",
            northSouth: "Z",
            upDown: "",
          }}
        />
      </div>
      <div className="carrier-jog-slider">
        <FmlxSlider label="Speed" onChange={setSpeed} value={speed} />
      </div>
      <div className="carrier-jog-position">
        <div className="title">Current position</div>
        <div className="axis-wrapper">
          <span className="axis">X: </span>
          <span className="axis-value">{carrierPosition.x} mm</span>
        </div>
        <div className="axis-wrapper">
          <span className="axis">Z: </span>
          <span className="axis-value">{carrierPosition.z} mm</span>
        </div>
      </div>
    </div>
  );
}
