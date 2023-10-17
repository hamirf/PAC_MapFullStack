import React, { useState } from "react";
import { FmlxTable, FmlxButton } from "fmlx-common-ui";
import { Column } from "../Model/Column";
import "./TableCommon.css"

type Props<T extends object> = {
    data: Array<T>;
    columns: Array<Column>;
    rowsHandler: (rowData: any) => void;
    useButton: boolean;
    addHandleClick?: () => void;
    removeHandleClick?: () => void;
    selectedRowIds: Array<T>
    getSelectedRowHandler?: (selectedItems: any[], rowIds: any[]) => void;
}

export default function TableCommon<T extends object>({
    data,
    columns,
    rowsHandler,
    useButton,
    addHandleClick,
    removeHandleClick,
    selectedRowIds,
    getSelectedRowHandler
}: Props<T>) {

    return (
        <div style={{
            width: "75%", margin: "25px"
        }}>
            {useButton && <div className="row" >
                <div className="column">
                    <FmlxButton
                        label="Add" size="lg" onClick={addHandleClick}
                        fullWidth={true} />
                </div>
                <div className="column">
                    <FmlxButton
                        label="Remove" size="lg" onClick={removeHandleClick}
                        fullWidth={true} />
                </div>
            </div>}
            <div>
                <FmlxTable
                    type="basic" columns={columns} data={data}
                    onRowClick={rowsHandler} 
                    selectedRowIds={selectedRowIds}
                    getSelectedRow={getSelectedRowHandler}/>
            </div>
        </div>
    )
}