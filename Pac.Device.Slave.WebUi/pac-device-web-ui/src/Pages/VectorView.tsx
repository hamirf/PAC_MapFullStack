import React, { useEffect, useState } from "react";
import TableCommon from "../Common/TableCommon";
import { FmlxButton } from "fmlx-common-ui";
import { EPacAxis, ScaraHandOrientation } from "../Model/CarrierVector";
import PacDeviceApi from "../Api/PacDeviceApi";
import { Column } from "../Model/Column";
import "./VectorView.css"
import { useAppSelector } from "../Redux/Hook";
import { modulePacStatusSelector } from "../Redux/ModuleStatusSlice";
import { PacStatus } from "../Model/ModuleStatus";


export default function VectorView() {
    // source point
    const [xCarrier, setXCarrier] = useState(0);
    const [zCarrier, setZCarrier] = useState(0);
    const [xScara, setXScarar] = useState(0);
    const [yScara, setYScara] = useState(0);
    const [tScara, setTScara] = useState(0);

    //velocity
    const [velocityXCarrier, setVelocityXCarrier] = useState(0);
    const [velocityZCarrier, setVelocityZCarrier] = useState(0);
    const [velocityScara, setvelocityScara] = useState(0);
    const [enableButton, setEnableButton] = useState(false as boolean);

    const status = useAppSelector(modulePacStatusSelector);


    useEffect(() => {
        console.log("status SINIII "+status);
        switch(status) { 
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

    function RunWayPoint() {

        console.log("xCarrier : " + xCarrier);
        console.log("zCarrier : " + zCarrier);
        console.log("xScara : " + xScara);
        console.log("yScara : " + yScara);
        console.log("tScara : " + tScara);
        console.log("velocityXCarrier : " + velocityXCarrier);
        console.log("velocityZCarrier : " + velocityZCarrier);
        console.log("velocityScara : " + velocityScara);


        PacDeviceApi.movePacVector({
            name: "movePacVector",
            carrierVector: {
                coordinate: {
                    x: xCarrier,
                    z: zCarrier
                },
                velocity: {
                    x: velocityXCarrier,
                    z: velocityZCarrier
                }
            },
            scaraVector: {
                coordinate: {
                    x: xScara,
                    y: yScara,
                    t: tScara,
                    orientation: ScaraHandOrientation.Right
                },
                velocity: velocityScara
            }
        }).then(() => {
            console.log("Succes to send move vector");
            setEnableButton(true);
        })

    }

    function StopMotor() {
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
                        <th>Move Absolute</th>
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
                                value={xCarrier}
                                onChange={(e) => {
                                    setXCarrier(Number(e.target.value));
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
                                value={zCarrier}
                                onChange={(e) => {
                                    setZCarrier(Number(e.target.value));
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
                                        value={xScara}
                                        onChange={(e) => {
                                            setXScarar(Number(e.target.value));
                                        }}
                                    />
                                </td>
                                <td style={{ border: 0 }}>
                                    <input type="text" style={{ width: "50px" }}
                                        min="0" max="100"
                                        className="input input-bordered w-20"
                                        value={yScara}
                                        onChange={(e) => {
                                            setYScara(Number(e.target.value));
                                        }}
                                    />
                                </td>
                                <td style={{ border: 0 }}>
                                    <input type="text" style={{ width: "50px" }}
                                        min="0" max="100"
                                        className="input input-bordered w-20"
                                        value={tScara}
                                        onChange={(e) => {
                                            setTScara(Number(e.target.value));
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
                            <FmlxButton label="Start" size="lg"
                                onClick={RunWayPoint} fullWidth={true} disabled={enableButton} />
                        </td>
                        <td style={{ border: 0 }}>
                            <FmlxButton label="Stop" size="lg" onClick={StopMotor} fullWidth={true}
                                disabled={!enableButton} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}