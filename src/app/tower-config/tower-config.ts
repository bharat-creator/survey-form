export interface TowerConfig {
    towerName: string;
    noOfFloor: number;
    noOfSeries: number;
    replumbingReq: boolean;
    ringMainsChanged: boolean;
    plumbingStructure: PlumbingStructure[];
}

export interface PlumbingStructure {
    name: string;
    type: string;
    size: string;
}
