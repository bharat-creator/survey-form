import { SeriesGrp } from './meter-by-floor/series-group';
import { SocietyDetail } from './society-details/society-details';
import { TowerConfig } from './tower-config/tower-config';
import { CommonMeter } from './common/common';
import { SupplyMeter } from './supply/supply';
export interface SurveyForm {
    societyDetails: SocietyDetail;
    towers: TowerGroup[];
    commonMtrs: CommonMeter[];
    supplyMtrs: SupplyMeter[];
}

export interface TowerGroup {
    towerNo: number;
    towerDetails: TowerConfig;
    seriesGrp: SeriesGrp[];
    yStrainer: any;
}
