import React, { useState } from "react";
import { FmlxTab } from "fmlx-common-ui";
import CarrierMoveAbsolute from "./CarrierMoveAbsolute";
import CarrierJog from "./CarrierJog/CarrierJog";
import CarrierMoveRelative from "./CarrierMoveRelative";
import "./CarrierView.css"

enum CarrierViewEnum {
  Jog = 0,
  MoveAbsolute = 1,
  MoveRelative = 2,  
}

export default function CarrierView() {
  const [selectedTab, setSelectedTab] = React.useState(
    CarrierViewEnum.Jog
  );

  const handleChange = ({ index }: { index: number }) => {
    setSelectedTab(index);
  };

  return (
    <>
    <FmlxTab
      items={[
        {
          title: "Move",
          content: 
          <div className="move-row">
              <div className="col-30">
                <h2>JOG</h2>
                <CarrierJog />
              </div>
              <div className="col-30">
                <h2>Move Absolute</h2>
                <CarrierMoveAbsolute />
              </div>
              <div className="col-30">
                <h2>Move Relative</h2>
                <CarrierMoveRelative />
              </div>
          </div>,
          disabled: false,
        }
      ]}
      selectedTab={selectedTab}
      onChange={handleChange}
    />
    </>
    
  );
}
