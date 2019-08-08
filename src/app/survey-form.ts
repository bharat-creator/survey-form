import { SeriesGrp } from './meter-by-floor/series-group';
import { SocietyDetail } from './society-details/society-details';
import { TowerConfig } from './tower-config/tower-config';
export interface SurveyForm {
    societyDetails: SocietyDetail;
    towers: TowerGroup[];
}

export interface TowerGroup {
    towerNo: number;
    towerDetails: TowerConfig;
    seriesGrp: SeriesGrp[];
}
