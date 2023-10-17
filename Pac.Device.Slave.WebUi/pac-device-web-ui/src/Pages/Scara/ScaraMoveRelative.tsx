import React, { useState, useEffect } from "react";
import {
  FmlxMotionControlPad,
  FmlxMotionControlPadButtonPosition,
  FmlxMotionControlPadCheckBoxProps,
  FmlxMotionControlPadMovement,
} from "fmlx-common-ui";

const SCARA_MOVE_RELATIVE_ARM_SPEED = "SCARA_MOVE_RELATIVE_ARM_SPEED";

function getSpeed(key: string) {
  const value = localStorage.getItem(key);
  if (value != null) {
    return Number.parseInt(value);
  } else {
    return 30;
  }
}

export default function ScaraMoveRelative() {
  const [speedXYState, setSpeedXYState] = useState(
    getSpeed(SCARA_MOVE_RELATIVE_ARM_SPEED)
  );
  const [speedTState, setSpeedTState] = useState(0);
  const [checkboxX, setCheckboxX] = useState(false);
  const [checkboxY, setCheckboxY] = useState(false);
  const [checkboxT, setCheckboxT] = useState(false);
  const [tValue, setTValue] = useState(0);
  const [xyValue, setXYValue] = useState(0);

  useEffect(() => {
    localStorage.setItem(SCARA_MOVE_RELATIVE_ARM_SPEED, speedXYState.toString());
  }, [speedXYState]);

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
  };

  const handleTClick = (buttonPosition: FmlxMotionControlPadButtonPosition) => {
    console.log("T buttonPosition:", buttonPosition);
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
    x: 10,
    y: 10,
  };

  const currentTPositionValue = {
    x: 10,
    y: 10,
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

  const handleXYChange = (value: number) => {
    console.log("xy: %d", value);
    setXYValue(value);
  };

  const handleTChange = (value: number) => {
    console.log("t: %d", value);
    setTValue(value);
  };

  const movementControlXYValue: FmlxMotionControlPadMovement = {
    xy: {
      value: xyValue.toString(),
      onChange: (value) => handleXYChange(Number.parseFloat(value)),
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
        type="relative"
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
