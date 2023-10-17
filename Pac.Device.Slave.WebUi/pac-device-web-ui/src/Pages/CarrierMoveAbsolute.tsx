import React, { useState, useEffect } from "react";
import {
  FmlxMotionControlPad,
  FmlxMotionControlPadButtonPosition,
  FmlxMotionControlPadCheckBoxProps,
  FmlxMotionControlPadMovement,
} from "fmlx-common-ui";
import CarrierApi from "../Api/CarrierApi";
import { useAppSelector } from "../Redux/Hook";
import { carrierPositionSelector } from "../Redux/ModuleStatusSlice";
import { ECarrierAxis } from "../Model/CarrierVector";

const CARRIER_MOVE_ABSOLUTE_ARM_SPEED = "CARRIER_MOVE_ABSOLUTE_ARM_SPEED";

function getSpeed(key: string) {
  const value = localStorage.getItem(key);
  if (value != null) {
    return Number.parseInt(value);
  } else {
    return 30;
  }
}

export default function CarrierMoveAbsolute() {
  const [speedState, setSpeedState] = useState(
    getSpeed(CARRIER_MOVE_ABSOLUTE_ARM_SPEED)
  );
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxZ, setCheckboxZ] = useState(false);
  const [zValue, setZValue] = useState(0);
  const [xValue, setXValue] = useState(0);

  useEffect(() => {
    localStorage.setItem(CARRIER_MOVE_ABSOLUTE_ARM_SPEED, speedState.toString());
  }, [speedState]);

  const carrierPosition = useAppSelector(carrierPositionSelector);

  const sliderXZProps = {
    label: "Speed",
    value: Number(speedState),
    onChange: (value: number) => {
      console.log("speed:", value);
      setSpeedState(value);
    },
  };

  const handleXZClick = (
    buttonPosition: FmlxMotionControlPadButtonPosition
  ) => {
    console.log("Button clicked: ", buttonPosition);
    switch (buttonPosition) {
      case "absolute-x": {
        CarrierApi.armAxisMoveAbsolute(ECarrierAxis.x, xValue, speedState);
        break;
      }
      case "absolute-z": {
        CarrierApi.armAxisMoveAbsolute(ECarrierAxis.z, zValue, speedState);
        break;
      }
    }
  };

  const handleCheckboxXChange = (event: any) => {
    setCheckboxX(event.target.checked);
  };

  const handleCheckboxZChange = (event: any) => {
    setCheckboxZ(event.target.checked);
  };

  const checkboxXZProps: FmlxMotionControlPadCheckBoxProps = {
    x: {
      checked: checkboxX,
      onChange: handleCheckboxXChange,
    },
    z: {
      checked: checkboxZ,
      onChange: handleCheckboxZChange,
    },
  };

  const currentXZPositionValue = {
    x: carrierPosition.x,
    z: carrierPosition.z,
  };

  const tooltipXZDescription = {
    x: {
      left: "X-",
      right: "X+",
    },
    z: {
      top: "Z+",
      bottom: "Z-",
    },
  };

  const handleXChange = (value: number) => {
    console.log("x: %d", value);
    setXValue(value);
  };

  const handleZChange = (value: number) => {
    console.log("z: %d", value);
    setZValue(value);
  };

  const movementControlXZValue: FmlxMotionControlPadMovement = {
    x: {
      value: xValue.toString(),
      onChange: (value) => handleXChange(Number.parseFloat(value)),
    },
    z: {
      value: zValue.toString(),
      onChange: (value) => handleZChange(Number.parseFloat(value)),
    },
  };

  return (
    <div>
      <FmlxMotionControlPad
        title="X and Z"
        type="absolute"
        currentPositionValue={currentXZPositionValue}
        sliderProps={sliderXZProps}
        checkboxProps={checkboxXZProps}
        movementControlValue={movementControlXZValue}
        tooltipDescription={tooltipXZDescription}
        onMovementControlClick={handleXZClick}
        showY={false}
        showMotorHoming={false}
      />
    </div>
  );
}
