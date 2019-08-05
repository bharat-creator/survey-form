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

  setNextUrl(value: string){
    this.nextUrl = value;
  }

}
