import { FmlxButton } from "fmlx-common-ui"
import MapCombinerApi from "../../Api/MapCombinerApi";
import { useRef, useEffect, useState } from "react";
import { Cue, CueMap } from "../../Model/CueMapModel";
import "./MapView.css";

export default function MapView() {
    const [map, setMap] = useState<CueMap>({
        len: 0,
        items: Array<Cue>()
    })
    
    //POST Params
    const [files, setFiles] = useState<FileList>();
    const [disableButton, setDisableButton] = useState(true);
    
    // Auxiliary attributes of multiple coordinate changes
    const [disableChangesButton, setDisableChangesButton] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const fileRef = useRef(null);
    const [editButtonLabel, setEditButtonLabel] = useState("Edit");
    
    function getMap() {
        MapCombinerApi.getMap()
            .then( ( val ) => {
                setMap( {
                    len: val.len,
                    items: val.items
                } );
            } )
            .catch( ( err ) => {
                alert( err );
            } );        
    }
    
    // GET Combined Map
    useEffect( () => {
        getMap();
    }, [] );

    // POST Maps
    const handleChange = ( e: any ) => {
        console.log("Event: ", e.target);
        const inFiles = e.target.files;
        console.log("Files: ", inFiles);
        if ( inFiles ) {
            setFiles( inFiles );
            setDisableButton( false );
        } else {
            setDisableButton( true );
        }
    }

    const handleUpload = (e: any) => {
        console.log("Upload Button Info: ", e.target);
        const data = new FormData();
        if (files) {
            for (let i = 0; i < files.length; i++) {
                data.append("files", files[i]);
            }
        }
        MapCombinerApi.combineMap(data)
            .then((status) => {
                alert(status);
                getMap();
                setDisableButton(true);
                // @ts-ignore
                fileRef.current.value = null;
            }).catch((err) => {
            alert(err)
        });
    }
        
    function handleInputIDChange( idVal: number, cueId: number ) {
        console.log("idVal: " + idVal);
        console.log("cueIdIn: " + cueId);

        const newCoordinate = map.items.map( ( coordinate ) => {
            if ( cueId === coordinate.cueId ) {
                return {...coordinate, id: idVal };
            }

            return coordinate;
        } )

        console.log("MAP COORDINATE THEN: ", map.items);

        if ( idVal != null ) {
            setMap({...map, items: newCoordinate});
            if (disableChangesButton) setDisableChangesButton(false);
        } else {
            if (!disableChangesButton) setDisableChangesButton(true);
        }
    }

    function handleInputTxChange( txVal: number, cueId: number ) {
        console.log("txVal: " + txVal);
        console.log("cueIdIn: " + cueId);

        const newCoordinate = map.items.map( ( coordinate ) => {
            if ( cueId === coordinate.cueId ) {
                return {...coordinate, tx: txVal};
            }

            return coordinate;
        } )

        console.log("MAP COORDINATE THEN: ", map.items);

        if ( txVal != null ) {
            setMap({...map, items: newCoordinate});
            if (disableChangesButton) setDisableChangesButton(false);
        } else {
            if (!disableChangesButton) setDisableChangesButton(true);
        }
    }
    
    // PUT Multiple Coordinates    
    function handleChanges() {
        console.log("MAP COORDINATE NOW: ", map.items);       
        
        MapCombinerApi.updateMapInBatch( map.items )
            .then( ( status ) => {
                alert( status );
                getMap();
                setDisableChangesButton(true);
                setIsEdit(false);
                setEditButtonLabel("Edit");
            } )
            .catch( ( err ) => {
                alert( err );
            } )
    }
    
    const handleEdit = (e: any) => {
        console.log("Edit Button Info: ", e.target);
        if (editButtonLabel === "Edit") {
            setIsEdit(true);
            setEditButtonLabel("Cancel");
        } else {
            getMap();
            setIsEdit(false);
            setEditButtonLabel("Edit");
        }
    }
    
    const mapTableContents =
        map.items.map( (coordinate, index) => {
            if (isEdit) {
                return(
                    <>
                        <tr className="coordinate-contents">
                            <td>{index + 1}</td>
                            <td>
                                <input type="text"
                                       id={`coor-id-${coordinate.cueId}`}
                                       inputMode="numeric"
                                       value={coordinate.id}
                                       onChange={( e ) => {
                                           handleInputIDChange(
                                               Number( e.target.value ),
                                               coordinate.cueId
                                           )
                                       }}
                                />
                            </td>
                            <td>{coordinate.rx}</td>
                            <td>{coordinate.ry}</td>
                            <td>{coordinate.rz}</td>
                            <td>
                                <input type="text"
                                       id={`coor-tx-${coordinate.cueId}`}
                                       inputMode="numeric"
                                       value={coordinate.tx}
                                       onChange={( e) => {
                                           handleInputTxChange(
                                               Number( e.target.value ),
                                               coordinate.cueId
                                           )
                                       }}
                                />
                            </td>
                            <td>{coordinate.ty}</td>
                            <td>{coordinate.tz}</td>
                            <td style={{border: 0}}></td>
                        </tr>
                    </>
                );
            }
            
            return(
                <>
                    <tr className="coordinate-contents">
                        <td>{index + 1}</td>
                        <td>{coordinate.id}</td>
                        <td>{coordinate.rx}</td>
                        <td>{coordinate.ry}</td>
                        <td>{coordinate.rz}</td>
                        <td>{coordinate.tx}</td>
                        <td>{coordinate.ty}</td>
                        <td>{coordinate.tz}</td>
                        <td style={{border: 0}}></td>
                    </tr>
                </>
            )
        } );
    
    return(
        <>
            <div className="content">
                <div className="table-side">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>ID</th>
                            <th>Rx</th>
                            <th>Ry</th>
                            <th>Rz</th>
                            <th>Tx</th>
                            <th>Ty</th>
                            <th>Tz</th>
                            <td style={{border: 0}}>
                                <FmlxButton id="edit-button" label={editButtonLabel} onClick={handleEdit} />
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                            {mapTableContents}
                        </tbody>
                    </table>
                </div>
                <div className="alter-side">
                    <div id="map-save-div">
                        <FmlxButton label={"Save Changes"} onClick={handleChanges} disabled={disableChangesButton} size="md" />
                    </div>
                    <div id="upload-map-div">
                        <input ref={fileRef} id="xml-input" type="file" name="file" accept=".xml" multiple
                               onChange={handleChange} />
                        <FmlxButton label={"Upload"} onClick={handleUpload} disabled={disableButton} />                        
                    </div>
                </div>
            </div>
        </>
    );
}