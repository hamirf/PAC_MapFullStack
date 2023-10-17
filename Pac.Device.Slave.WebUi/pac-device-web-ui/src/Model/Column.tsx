export interface Column{
    Header:string, 
    accessor:string, 
    headerStyle:HeaderStyle,
    Cell?: React.ReactNode
}

export interface HeaderStyle{
    width:string,
}