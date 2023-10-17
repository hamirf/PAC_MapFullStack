import React, { CSSProperties, useEffect, useRef } from "react";
import { useAppSelector } from "../../Redux/Hook";
import { smartAlignmentCameraStatusSelector } from "../../Redux/ModuleStatusSlice";

type Props = {
  style?: CSSProperties;
};

export function SmartAlignmentCameraLiveImage({ style = {} }: Props) {
  const cameraState = useAppSelector(smartAlignmentCameraStatusSelector);

  const originalImageWidth = cameraState?.imageWidth ?? 100;
  const originalImageHeight = cameraState?.imageHeight ?? 100;

  const imageStreamRef = useRef<HTMLImageElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageStream = imageStreamRef?.current;
    const display = displayRef?.current;
    if (
      imageStream == null ||
      display == null
    ) {
      return;
    }

    const displayWidth = display.clientWidth;
    const displayHeight = display.clientHeight;

    const ratio = Math.min(
      displayWidth / originalImageWidth,
      displayHeight / originalImageHeight
    );
    const scaledWidth = originalImageWidth * ratio;
    const scaledHeight = originalImageHeight * ratio;

    //------WIDTH & HEIGHT-------//
    imageStream.width = scaledWidth;
    imageStream.height = scaledHeight;

    //-------LEFT && RIGHT-------//
    const imageLeft = (displayWidth - scaledWidth) / 2;
    const imageTop = (displayHeight - scaledHeight) / 2;

    imageStream.style.left = imageLeft + "px";
    imageStream.style.top = imageTop + "px";
  }, [
    originalImageHeight,
    originalImageWidth,
    imageStreamRef?.current?.naturalWidth,
    imageStreamRef?.current?.naturalHeight,
  ]);

  const src =
    "//" + window.location.hostname + ":" + cameraState?.streamServerPort;

  console.log("LIVE IMAGE RENDERED");

  return (
    <div
      ref={displayRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        style={{
          position: "absolute",
        }}
        ref={imageStreamRef}
        src={src}
        alt="..."
      />
    
    </div>
  );
}
