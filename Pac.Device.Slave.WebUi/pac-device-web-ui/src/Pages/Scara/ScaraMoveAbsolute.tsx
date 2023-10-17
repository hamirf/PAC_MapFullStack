import React, { useState, useEffect } from "react";
import {
  FmlxMotionControlPad,
  FmlxMotionControlPadButtonPosition,
  FmlxMotionControlPadCheckBoxProps,
  FmlxMotionControlPadMovement,
} from "fmlx-common-ui";
import { useAppSelector } from "../../Redux/Hook";
import { scaraPositionSelector } from "../../Redux/ModuleStatusSlice";
import ScaraApi from "../../Api/ScaraApi";
import { ScaraHandOrientation } from "../../Model/CarrierVector";

const SCARA_MOVE_ABSOLUTE_ARM_SPEED = "SCARA_MOVE_ABSOLUTE_ARM_SPEED";

function getSpeed(key: string) {
  const value = localStorage.getItem(key);
  if (value != null) {
    return Number.parseInt(value);
  } else {
    return 30;
  }
}

export default function ScaraMoveAbsolute() {
  const [speedXYState, setSpeedXYState] = useState(
    getSpeed(SCARA_MOVE_ABSOLUTE_ARM_SPEED)
  );
  const [speedTState, setSpeedTState] = useState(0);
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxY, setCheckboxY] = useState(false);
  const [checkboxT, setCheckboxT] = useState(false);
  const [tValue, setTValue] = useState(0);
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);

  useEffect(() => {
    localStorage.setItem(SCARA_MOVE_ABSOLUTE_ARM_SPEED, speedXYState.toString());
  }, [speedXYState]);

  const scaraPosition = useAppSelector(scaraPositionSelector);

  const sliderXYProps = {
    label: "Speed",
    value: Number(speedXYState),
    onChange: (value: number) => {
      console.log("speed:", value);
      setSpeedXYState(value);
    },
  };

  const sliderTProps = {
    label: "Speed",
    value: Number(speedTState),
    onChange: (value: number) => {
      console.log("speed:", value);
      setSpeedTState(value);
    },
  };

  const handleXYClick = (
    buttonPosition: FmlxMotionControlPadButtonPosition
  ) => {
    console.log("XY buttonPosition:", buttonPosition);
    ScaraApi.armMoveAbsolute(
      {
        orientation: Number(ScaraHandOrientation.Right),
        x: xValue,
        y: yValue,
        t: tValue,
      },
      Number(speedXYState)
    );
  };

  const handleTClick = (buttonPosition: FmlxMotionControlPadButtonPosition) => {
    console.log("T buttonPosition:", buttonPosition);
    ScaraApi.armMoveAbsolute(
      {
        orientation: Number(ScaraHandOrientation.Right),
        x: xValue,
        y: yValue,
        t: tValue,
      },
      Number(speedXYState)
    );
  };

  const handleCheckboxXChange = (event: any) => {
    setCheckboxX(event.target.checked);
  };

  const handleCheckboxYChange = (event: any) => {
    setCheckboxY(event.target.checked);
  };

  const handleCheckboxTChange = (event: any) => {
    setCheckboxT(event.target.checked);
  };

  const checkboxXYProps: FmlxMotionControlPadCheckBoxProps = {
    x: {
      checked: checkboxX,
      onChange: handleCheckboxXChange,
    },
    y: {
      checked: checkboxY,
      onChange: handleCheckboxYChange,
    },
  };

  const checkboxTProps: FmlxMotionControlPadCheckBoxProps = {
    x: {
      checked: checkboxT,
      onChange: handleCheckboxTChange,
    },
  };

  const currentXYPositionValue = {
    x: scaraPosition.x,
    y: scaraPosition.y,
  };

  const currentTPositionValue = {
    x: scaraPosition.t,
  };

  const tooltipXYDescription = {
    x: {
      left: "X-",
      right: "X+",
    },
    y: {
      top: "Y+",
      bottom: "Y-",
    },
  };

  const tooltipTDescription = {
    x: {
      left: "T-",
      right: "T+",
    },
  };

  const handleXChange = (value: number) => {
    console.log("x: %d", value);
    setXValue(value);
  };

  const handleYChange = (value: number) => {
    console.log("y: %d", value);
    setYValue(value);
  };

  const handleTChange = (value: number) => {
    console.log("t: %d", value);
    setTValue(value);
  };

  const movementControlXYValue: FmlxMotionControlPadMovement = {
    x: {
      value: xValue.toString(),
      onChange: (value) => handleXChange(Number.parseFloat(value)),
    },
    y: {
      value: yValue.toString(),
      onChange: (value) => handleYChange(Number.parseFloat(value)),
    },
  };

  const movementControlTValue: FmlxMotionControlPadMovement = {
    x: {
      value: tValue.toString(),
      onChange: (value) => handleTChange(Number.parseFloat(value)),
    },
  };

  return (
    <div>
      <FmlxMotionControlPad
        title="X and Y"
        type="absolute"
        currentPositionValue={currentXYPositionValue}
        sliderProps={sliderXYProps}
        checkboxProps={checkboxXYProps}
        movementControlValue={movementControlXYValue}
        tooltipDescription={tooltipXYDescription}
        onMovementControlClick={handleXYClick}
        showZ={false}
        showMotorHoming={false}
      />
      <FmlxMotionControlPad
        title="Theta"
        type="rotation"
        currentPositionValue={currentTPositionValue}
        sliderProps={sliderTProps}
        checkboxProps={checkboxTProps}
        movementControlValue={movementControlTValue}
        tooltipDescription={tooltipTDescription}
        onMovementControlClick={handleTClick}
        showY={false}
        showZ={false}
        showMotorHoming={false}
      />
    </div>
  );
}
