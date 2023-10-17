import React, { useEffect, useCallback } from "react";
import "./MotionControlPad.css";

export enum EMotionPadDirection {
  Unknown = 0,
  North = 1,
  South = 2,
  West = 3,
  East = 4,
  Up = 5,
  Down = 6,
  ClockWise = 7,
  CounterClockWise = 8,
  Center = 9,
}

type Props = {
  style?: React.CSSProperties;
  onMouseDown: (direction: EMotionPadDirection) => void;
  onMouseUp: () => void;
  show: {
    center: boolean;
    upDown: boolean;
    eastWest: boolean;
    northSouth: boolean;
  };
  label: {
    upDown: string;
    eastWest: string;
    northSouth: string;
  };
};

type ButtonProps = {
  style?: React.CSSProperties;
  onMouseDown: (direction: EMotionPadDirection) => void;
  onMouseUp: () => void;
  direction: EMotionPadDirection;
};

function ImagingArmMovementButton({
  style = {},
  onMouseDown,
  onMouseUp,
  direction,
}: ButtonProps) {
  let angle = 0;
  let className = "motion-control-pad-button";
  switch (direction) {
    case EMotionPadDirection.West: {
      angle = 0;
      break;
    }
    case EMotionPadDirection.East: {
      angle = 180;
      break;
    }
    case EMotionPadDirection.Up:
    case EMotionPadDirection.North: {
      angle = 90;
      break;
    }
    case EMotionPadDirection.Down:
    case EMotionPadDirection.South: {
      angle = -90;
      break;
    }
    case EMotionPadDirection.Center: {
      className = "motion-control-pad-center";
      break;
    }
  }

  return (
    <button
      style={{ ...style }}
      className={className}
      onMouseDown={() => onMouseDown(direction)}
      onMouseUp={() => onMouseUp()}
    >
      <div
        style={{
          margin: "auto",
        }}
      >
        {direction !== EMotionPadDirection.Center && (
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${angle})`}
          >
            <path d="M10 0L0 8L10 16V11V10V6V5L10 0Z" fill="white" />
          </svg>
        )}
        {direction === EMotionPadDirection.Center && "C"}
      </div>
    </button>
  );
}

function getDirection(event: KeyboardEvent) {
  if (event.repeat) {
    return EMotionPadDirection.Unknown;
  }
  const element = event.target as Element;
  if (element && element.matches("input")) {
    return EMotionPadDirection.Unknown;
  }
  if (event.location !== event.DOM_KEY_LOCATION_NUMPAD) {
    return EMotionPadDirection.Unknown;
  }

  let direction = EMotionPadDirection.Unknown;

  switch (event.key) {
    case "4":
    case "ArrowLeft": {
      direction = EMotionPadDirection.West;
      break;
    }
    case "6":
    case "ArrowRight": {
      direction = EMotionPadDirection.East;
      break;
    }

    case "8":
    case "ArrowUp": {
      direction = EMotionPadDirection.North;
      break;
    }
    case "2":
    case "ArrowDown": {
      direction = EMotionPadDirection.South;
      break;
    }

    case "9":
    case "PageUp": {
      direction = EMotionPadDirection.Up;
      break;
    }
    case "3":
    case "PageDown": {
      direction = EMotionPadDirection.Down;
      break;
    }

    case "5":
    case "Clear": {
      if (event.shiftKey) {
        direction = EMotionPadDirection.Center;
      }
      break;
    }
  }
  return direction;
}

export default function MotionControlPad({
  onMouseDown,
  onMouseUp,
  show,
  label,
}: Props) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const direction = getDirection(event);

      if (direction !== EMotionPadDirection.Unknown) {
        onMouseDown(direction);
      }
    },
    [onMouseDown]
  );

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    const direction = getDirection(event);

    if (direction !== EMotionPadDirection.Unknown) {
      onMouseUp();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
      document.removeEventListener("keyup", onKeyUp, false);
    };
  }, []);
  return (
    <div className="motion-control-pad">
      {show.eastWest && (
        <span
          style={{
            gridArea: "label-x",
          }}
        >
          {label.eastWest}
        </span>
      )}
      {show.northSouth && (
        <span
          style={{
            gridArea: "label-y",
          }}
        >
          {label.northSouth}
        </span>
      )}
      {show.upDown && (
        <span
          style={{
            gridArea: "label-z",
          }}
        >
          {label.upDown}
        </span>
      )}

      {show.eastWest && (
        <>
          <ImagingArmMovementButton
            style={{
              gridArea: "button-xn",
            }}
            direction={EMotionPadDirection.West}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />

          <ImagingArmMovementButton
            style={{
              gridArea: "button-xp",
            }}
            direction={EMotionPadDirection.East}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        </>
      )}

      {show.northSouth && (
        <>
          <ImagingArmMovementButton
            style={{
              gridArea: "button-yn",
            }}
            direction={EMotionPadDirection.South}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
          <ImagingArmMovementButton
            style={{
              gridArea: "button-yp",
            }}
            direction={EMotionPadDirection.North}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />{" "}
        </>
      )}

      {show.upDown && (
        <>
          <ImagingArmMovementButton
            style={{
              gridArea: "button-zp",
            }}
            direction={EMotionPadDirection.Up}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />

          <ImagingArmMovementButton
            style={{
              gridArea: "button-zn",
            }}
            direction={EMotionPadDirection.Down}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        </>
      )}

      {show.center && (
        <ImagingArmMovementButton
          style={{
            gridArea: "button-center",
          }}
          direction={EMotionPadDirection.Center}
          onMouseDown={onMouseDown}
          onMouseUp={() => {}}
        />
      )}
    </div>
  );
}
