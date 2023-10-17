import { FmlxSwitch, FmlxTab } from "fmlx-common-ui";
import React from "react";
import { useAppSelector } from "../../Redux/Hook";
import { smartAlignmentCameraStatusSelector } from "../../Redux/ModuleStatusSlice";
import { SmartAlignmentCameraLiveImage } from "../Control/SmartAlignmentCameraLiveImage";
import ScaraMoveAbsolute from "./ScaraMoveAbsolute";
import ScaraMoveRelative from "./ScaraMoveRelative";
import "./ScaraView.css";
import SmartAlignmentCameraApi from "../../Api/SmartAlignmentCameraApi";

enum ScaraViewEnum {
  MoveAbsolute = 0,
  MoveRelative = 1,
}

export default function ScaraView() {
  const [selectedTab, setSelectedTab] = React.useState(
    ScaraViewEnum.MoveAbsolute
  );

  const smartAlignmentCameraStatus = useAppSelector(
    smartAlignmentCameraStatusSelector
  );

  const isStreaming =  smartAlignmentCameraStatus.isStreaming;
  const isSmartAlignmentAlive =  smartAlignmentCameraStatus.isSmartAlignment;
  const isDetectingMarker =  smartAlignmentCameraStatus.isDetectingMarker;

  const handleChange = ({ index }: { index: number }) => {
    setSelectedTab(index);
  };

  const setStreaming = (isStreaming: boolean) => {
    SmartAlignmentCameraApi.setStreaming(isStreaming);
  };

  const setSmartAlignment = (isSmartAlign: boolean) => {
    SmartAlignmentCameraApi.setDoSmartaligment(isSmartAlign);
  };

  const setDetectingmarker = (isDetectingMarker: boolean) => {
    SmartAlignmentCameraApi.setDetectingMarker(isDetectingMarker);
  };

  return (
    <div className="scara-container">
      <div className="scara-control">
        <FmlxTab
          items={[
            {
              title: "Move Absolute",
              content: <ScaraMoveAbsolute />,
              disabled: false,
            },
            {
              title: "Move Relative",
              content: <ScaraMoveRelative />,
              disabled: false,
            },
          ]}
          selectedTab={selectedTab}
          onChange={handleChange}
        />
        <FmlxSwitch label="Live Stream" checked={isStreaming} onChange={setStreaming} />
        <FmlxSwitch label="Live Smart Alignment" checked={isSmartAlignmentAlive} onChange={setSmartAlignment} />
        <FmlxSwitch label="Detect Marker" checked={isDetectingMarker} onChange={setDetectingmarker} />
      </div>
      <div className="scara-live-stream">
        <SmartAlignmentCameraLiveImage style={{ top: 0, left: 0 }} />
      </div>
    </div>
  );
}
