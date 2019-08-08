import { async } from '@angular/core/testing';
import { SeriesGrp, FlatGrp } from './meter-by-floor/series-group';
import { TowerConfig } from './tower-config/tower-config';
import { SocietyDetail } from './society-details/society-details';
import { SurveyForm, TowerGroup } from './survey-form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  trackerId: number;
  towerNo: number;
  seriesNo: number;
  groupNo: number;
  prevUrl: string;
  nextUrl: string;

  surveyForm = {} as SurveyForm;
  noOfFloor: number;
  noOfSeries: number;
  flatgrp: FlatGrp;

  constructor() {
  }

  getTrackerId(): number {
    return this.trackerId;
  }

  setTrackerId(value: number) {
    this.trackerId = value;
  }

  getTowerNo(): number {
    return this.towerNo;
  }

  setTowerNo(value: number) {
    this.towerNo = value;
  }

  getSeriesNo(): number {
    return this.seriesNo;
  }

  setSeriesNo(value: number) {
    this.seriesNo = value;
  }

  getGroupNo(): number {
    return this.groupNo;
  }

  setGroupNo(value: number) {
    this.groupNo = value;
  }

  getPrevUrl(): string {
    return this.prevUrl;
  }

  setPrevUrl(value: string) {
    this.prevUrl = value;
  }

  getNextUrl() {
    return this.nextUrl;
  }

  setNextUrl(value: string) {
    this.nextUrl = value;
  }

  setSocietyDetails(value: SocietyDetail) {
    this.surveyForm.societyDetails = value;
  }

  getSocietyDetails(): SocietyDetail {
    return this.surveyForm.societyDetails;
  }

  setNoOfFloors(value: number) {
    this.noOfFloor = value;
  }

  getNoOfFloors(towerNum: number): number {
    if (this.surveyForm === undefined || this.surveyForm.towers === undefined) {
      return undefined;
    } else {
      const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === towerNum);
      if (towerIndex > -1) {
        return this.surveyForm.towers[towerIndex].towerDetails.noOfFloor;
      } else {
        return undefined;
      }
    }
  }

  getNoOfSeries(towerNum: number): number {
    if (this.surveyForm === undefined || this.surveyForm.towers === undefined){
      return 0;
    } else {
      const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === towerNum);
      if (towerIndex > -1) {
        return this.surveyForm.towers[towerIndex].towerDetails.noOfSeries;
      } else {
        return 0;
      }
    }
  }

  setTowerDetails(value: TowerConfig, towerNum: number) {
    if (this.surveyForm.towers === undefined) {
      this.surveyForm.towers = [{ towerNo: towerNum, towerDetails: value, seriesGrp: [] }];
    } else if (this.surveyForm.towers.length >= 1) {
      const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === towerNum);
      if (towerIndex === -1) {
        this.surveyForm.towers.push({ towerNo: towerNum, towerDetails: value, seriesGrp: [] });
      }
    }
  }

  getTowerDetails(towerNum: number): TowerConfig {
    if (this.surveyForm.towers === undefined) {
      return undefined;
    } else if (this.surveyForm.towers.length > 0) {
      const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === towerNum);
      if (towerIndex > -1) {
        return this.surveyForm.towers[towerIndex].towerDetails;
      } else {
        return undefined;
      }
    }
  }

  getAllTowersDetails(index: number): TowerGroup[] {
    return this.surveyForm.towers;
  }


  setGroupDetail(value: FlatGrp) {
    this.flatgrp = value;
    const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === this.towerNo);
    if (towerIndex > -1) {
      const seriesLength = this.surveyForm.towers[towerIndex].seriesGrp.length;
      if (seriesLength === 0) {
        this.surveyForm.towers[towerIndex].seriesGrp.push({ seriesNo: this.seriesNo, flatGrp: []});
        this.surveyForm.towers[towerIndex].seriesGrp[seriesLength].flatGrp.push(value);
      } else {
        const seriesindex = this.surveyForm.towers[towerIndex].seriesGrp.findIndex(x => x.seriesNo === this.seriesNo);
        if ( seriesindex > -1) {
          this.surveyForm.towers[towerIndex].seriesGrp[seriesindex].flatGrp.push(value);
        } else {
          this.surveyForm.towers[towerIndex].seriesGrp.push({ seriesNo: this.seriesNo, flatGrp: []});
          this.surveyForm.towers[towerIndex].seriesGrp[seriesLength].flatGrp.push(value);
        }
      }
    }
  }

  getGroupDetails(): FlatGrp {
    return this.flatgrp;
  }

  getGroupDataFromObj(): FlatGrp {
    const towerIndex = this.surveyForm.towers.findIndex(x => x.towerNo === this.towerNo);
    if (towerIndex > -1) {
      const seriesLength = this.surveyForm.towers[towerIndex].seriesGrp.length;
      if (seriesLength === 0) {
        return undefined;
      } else {
        const seriesIndex = this.surveyForm.towers[towerIndex].seriesGrp.findIndex(x => x.seriesNo === this.seriesNo);
        if ( seriesIndex > -1) {
          const groupIndex = this.surveyForm.towers[towerIndex].seriesGrp[seriesIndex].flatGrp.findIndex(x => x.groupNo === this.groupNo);
          if ( groupIndex > -1) {
            return this.surveyForm.towers[towerIndex].seriesGrp[seriesIndex].flatGrp[groupIndex];
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      }
    }
  }

  getSurveyFormObj() {
    return this.surveyForm;
  }

  resetSurveyFormObj() {
    this.surveyForm = {} as SurveyForm;
  }
}
