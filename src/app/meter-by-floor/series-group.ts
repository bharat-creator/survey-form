export interface SeriesGrp {
    seriesNo: number;
    flatGrp: FlatGrp[];
}

export interface FlatGrp {
    groupNo: number;
    from: number;
    to: number;
    flatType: string;
    jointSeries: number;
    jointFlat: string;
    inletGrp: InletGrp[];
}

export interface InletGrp {
    inlet: string;
    type: string;
    meter: string;
}
