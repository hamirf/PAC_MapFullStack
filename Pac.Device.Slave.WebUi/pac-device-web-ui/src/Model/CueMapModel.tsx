export interface Cue {
    cueId: number;
    id: number;
    rx: number;
    ry: number;
    rz: number;
    tx: number;
    ty: number;
    tz: number;
}

export interface CueMap {
    len: number;
    items: Array<Cue>;
}