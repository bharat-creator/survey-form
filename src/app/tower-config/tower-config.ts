export interface TowerConfig {
    towerName: string;
    noOfFloor: number;
    noOfSeries: number;
    replumbingReq: boolean;
    ringMainsChanged: boolean;
    plumbingStructure: PlumbingStructure[];
    seriesGrp: any;
}

export interface PlumbingStructure {
    name: string;
    type: string;
    size: string;
}
