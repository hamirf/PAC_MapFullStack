import React, { useState, useEffect } from "react";
import {
  FmlxMotionControlPad,
  FmlxMotionControlPadButtonPosition,
  FmlxMotionControlPadCheckBoxProps,
  FmlxMotionControlPadMovement,
} from "fmlx-common-ui";
import CarrierApi from "../Api/CarrierApi";
import { ECarrierAxis } from "../Model/CarrierVector";
import { carrierPositionSelector } from "../Redux/ModuleStatusSlice";
import { useAppSelector } from "../Redux/Hook";

const CARRIER_MOVE_RELATIVE_ARM_SPEED = "CARRIER_MOVE_RELATIVE_ARM_SPEED";

function getSpeed(key: string) {
  const value = localStorage.getItem(key);
  if (value != null) {
    return Number.parseInt(value);
  } else {
    return 30;
  }
}

export default function CarrierMoveRelative() {
  const [speedState, setSpeedState] = useState(getSpeed(CARRIER_MOVE_RELATIVE_ARM_SPEED));
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxz, setCheckboxz] = useState(false);
  const [xzValue, setxzValue] = useState(0);

  useEffect(() => {
    localStorage.setItem(CARRIER_MOVE_RELATIVE_ARM_SPEED, speedState.toString());
  }, [speedState]);

  const carrierPosition = useAppSelector(carrierPositionSelector);

  const sliderxzProps = {
    label: "Speed",
    value: Number(speedState),
    onChange: (value: number) => {
      console.log("speed:", value);
      setSpeedState(value);
    },
  };

  const handlexzClick = (
    buttonPosition: FmlxMotionControlPadButtonPosition
  ) => {
    console.log("xz buttonPosition:", buttonPosition);
    switch (buttonPosition) {
      case "X+": {
        CarrierApi.armAxisMoveAbsolute(
          ECarrierAxis.x,
          carrierPosition.x + xzValue,
          speedState
        );
        break;
      }
      case "X-": {
        CarrierApi.armAxisMoveAbsolute(
          ECarrierAxis.x,
          carrierPosition.x - xzValue,
          speedState
        );
        break;
      }
      case "Z+": {
        CarrierApi.armAxisMoveAbsolute(
          ECarrierAxis.z,
          carrierPosition.z + xzValue,
          speedState
        );
        break;
      }
      case "Z-": {
        CarrierApi.armAxisMoveAbsolute(
          ECarrierAxis.z,
          carrierPosition.z - xzValue,
          speedState
        );
        break;
      }
    }
  };

  const handleCheckboxXChange = (event: any) => {
    setCheckboxX(event.target.checked);
  };

  const handleCheckboxzChange = (event: any) => {
    setCheckboxz(event.target.checked);
  };

  const checkboxxzProps: FmlxMotionControlPadCheckBoxProps = {
    x: {
      checked: checkboxX,
      onChange: handleCheckboxXChange,
    },
    z: {
      checked: checkboxz,
      onChange: handleCheckboxzChange,
    },
  };

  const currentxzPositionValue = {
    x: carrierPosition.x,
    z: carrierPosition.z,
  };

  const tooltipxzDescription = {
    x: {
      left: "X-",
      right: "X+",
    },
    z: {
      top: "Z+",
      bottom: "Z-",
    },
  };

  const handlexzChange = (value: number) => {
    console.log("xz: %d", value);
    setxzValue(value);
  };

  const movementControlxzValue: FmlxMotionControlPadMovement = {
    x: {
      value: xzValue.toString(),
      onChange: (value) => handlexzChange(Number.parseFloat(value)),
    },
    z: {
      value: xzValue.toString(),
      onChange: (value) => handlexzChange(Number.parseFloat(value)),
    },
  };

  return (
    <div>
      <FmlxMotionControlPad
        title="X and Z"
        type="relative"
        currentPositionValue={currentxzPositionValue}
        sliderProps={sliderxzProps}
        checkboxProps={checkboxxzProps}
        movementControlValue={movementControlxzValue}
        tooltipDescription={tooltipxzDescription}
        onMovementControlClick={handlexzClick}
        showY={false}
        showMotorHoming={false}
      />
    </div>
  );
}
