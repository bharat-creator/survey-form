export interface SeriesGrp {
    seriesNo: number;
    flatGrp: FlatGrp[];
}

export interface FlatGrp {
    from: string;
    to: string;
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