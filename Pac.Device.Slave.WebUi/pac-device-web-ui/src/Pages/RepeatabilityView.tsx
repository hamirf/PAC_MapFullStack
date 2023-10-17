import React, { useEffect, useState } from "react";
import { FmlxTab } from "fmlx-common-ui";
import "./CarrierView.css"
import { FmlxButton } from "fmlx-common-ui";
import "./CheckRepeatability.css"
import PacDeviceApi from "../Api/PacDeviceApi";
import { ScaraHandOrientation } from "../Model/CarrierVector";
import { useAppSelector } from "../Redux/Hook";
import { modulePacStatusSelector } from "../Redux/ModuleStatusSlice";
import { PacStatus } from "../Model/ModuleStatus";


export default function RepeatabilityView() {
  // source point
  const [xCarrierSource, setXCarrierSource] = useState(0);
  const [zCarrierSource, setZCarrierSource] = useState(0);
  const [xScaraSource, setXScararSource] = useState(0);
  const [yScaraSource, setYScaraSource] = useState(0);
  const [tScaraSource, setTScaraSource] = useState(0);
  // Dest point
  const [xCarrierDest, setXCarrierDest] = useState(0);
  const [zCarrierDest, setZCarrierDest] = useState(0);
  const [xScaraDest, setXScararDest] = useState(0);
  const [yScaraDest, setYScaraDest] = useState(0);
  const [tScaraDest, setTScaraDest] = useState(0);
  //velocity
  const [velocityXCarrier, setVelocityXCarrier] = useState(0);
  const [velocityZCarrier, setVelocityZCarrier] = useState(0);
  const [velocityScara, setvelocityScara] = useState(0);

  const [iteration, setIteration] = useState(0);
  const [enableButton, setEnableButton] = useState(false as boolean);

  const status = useAppSelector(modulePacStatusSelector);


  useEffect(() => {
    console.log("status SINIII " + status);
    switch (status) {
      case PacStatus.Idle: {
        setEnableButton(false);
        break;
      }
      case PacStatus.Running: {
        setEnableButton(true);
        break;
      }
      default: {
        setEnableButton(false);
        break;
      }
    }
  }, [status]);

  function HandleStart() {
    if (iteration == 0) {
      console.log("No need to run")
      return;
    }

    PacDeviceApi.checkRepeatability({
      startposition: {
        name: "source vector",
        carrierVector: {
          coordinate: {
            x: xCarrierSource,
            z: zCarrierSource
          },
          velocity: {
            x: velocityXCarrier,
            z: velocityZCarrier
          }
        },
        scaraVector: {
          coordinate: {
            x: xScaraSource,
            y: yScaraSource,
            t: tScaraSource,
            orientation: ScaraHandOrientation.Right
          },
          velocity: velocityScara
        }
      },
      endPosition: {
        name: "destination vector",
        carrierVector: {
          coordinate: {
            x: xCarrierDest,
            z: zCarrierDest
          },
          velocity: {
            x: velocityXCarrier,
            z: velocityZCarrier
          }
        },
        scaraVector: {
          coordinate: {
            x: xScaraDest,
            y: yScaraDest,
            t: tScaraDest,
            orientation: ScaraHandOrientation.Right
          },
          velocity: velocityScara
        }
      },
      iteration: iteration
    }).then(() => {
      console.log("Success to send repeatability");
      setEnableButton(true);
    });

  }

  function HandleStop() {
    if (iteration == 0) {
      console.log("No need to stop")
      return;
    }
    console.log("Stop motor");
    PacDeviceApi.stopAllMotor();
    setEnableButton(false);
  }

  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Move Source</th>
            <th>Move Destination</th>
            <th>Velocity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="X axis">
            <td style={{ width: "1000px" }}>X Axis</td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={xCarrierSource}
                onChange={(e) => {
                  setXCarrierSource(Number(e.target.value));
                }}
              />
            </td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={xCarrierDest}
                onChange={(e) => {
                  setXCarrierDest(Number(e.target.value));
                }}
              />
            </td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={velocityXCarrier}
                onChange={(e) => {
                  setVelocityXCarrier(Number(e.target.value));
                }}
              />
            </td>
          </tr>
          <tr className="Z axis">
            <td>Z Axis</td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={zCarrierSource}
                onChange={(e) => {
                  setZCarrierSource(Number(e.target.value));
                }}
              />
            </td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={zCarrierDest}
                onChange={(e) => {
                  setZCarrierDest(Number(e.target.value));
                }}
              />
            </td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={velocityZCarrier}
                onChange={(e) => {
                  setVelocityZCarrier(Number(e.target.value));
                }}
              />
            </td>
          </tr>
          <tr className="Scara axis">
            <td>Scara</td>
            <td>
              <tr>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={xScaraSource}
                    onChange={(e) => {
                      setXScararSource(Number(e.target.value));
                    }}
                  />
                </td>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={yScaraSource}
                    onChange={(e) => {
                      setYScaraSource(Number(e.target.value));
                    }}
                  />
                </td>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={tScaraSource}
                    onChange={(e) => {
                      setTScaraSource(Number(e.target.value));
                    }}
                  />
                </td>
              </tr>
            </td>
            <td>
              <tr>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={xScaraDest}
                    onChange={(e) => {
                      setXScararDest(Number(e.target.value));
                    }}
                  />
                </td>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={yScaraDest}
                    onChange={(e) => {
                      setYScaraDest(Number(e.target.value));
                    }}
                  />
                </td>
                <td style={{ border: 0 }}>
                  <input type="text" style={{ width: "50px" }}
                    min="0" max="100"
                    className="input input-bordered w-20"
                    value={tScaraDest}
                    onChange={(e) => {
                      setTScaraDest(Number(e.target.value));
                    }}
                  />
                </td>
              </tr>
            </td>
            <td>
              <input type="text"
                min="0"
                max="100"
                className="input input-bordered w-20"
                value={velocityScara}
                onChange={(e) => {
                  setvelocityScara(Number(e.target.value));
                }}
              />
            </td>
          </tr>
        </tbody>
        <tfoot >
          <tr>
            <td style={{ border: 0 }}>
            </td>
            <td style={{ border: 0 }}>
              <input type="text" placeholder="iteration"
                className="input input-bordered w-20"
                value={iteration}
                onChange={(e) => {
                  setIteration(Number(e.target.value));
                }}
              />
            </td>
            <td style={{ border: 0 }}>
              <FmlxButton label="Start" size="lg"
                onClick={HandleStart} fullWidth={true} disabled={enableButton} />
            </td>
            <td style={{ border: 0 }}>
              <FmlxButton label="Stop" size="lg" onClick={HandleStop} fullWidth={true}
                disabled={!enableButton} />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
