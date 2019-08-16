import { TowerConfig, PlumbingStructure } from './tower-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { NetworkService } from '../network.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TowerConfigService {
  private towerConfig: TowerConfig;
  private noOfFloor: number;
  private noOfSeries: number;

  private plumbingStructure: PlumbingStructure[];
  towerNo: number;
  trackerId: number;

  constructor(private network: NetworkService) {
      this.towerConfig = {
          towerName: '',
          noOfFloor: 0,
          noOfSeries: 0,
          replumbingReq: true,
          ringMainsChanged: false,
          plumbingStructure: [
              { name: 'Ring Mains', type: '', size: ''},
              { name: 'Down Comers', type: '', size: ''},
              { name: 'Tapping', type: '', size: ''}
          ]
      };
  }

  setNoOfFloors(value: number) {
    this.noOfFloor = value;
  }

  getNoOfFloors(): number {
    return this.noOfFloor;
  }

  setNoOfSeries(value: number) {
    this.noOfSeries = value;
  }

  getNoOfSeries(): number {
    return this.noOfSeries;
  }

  getTowerDetail(trackerId: number, towerNo: number): Observable<any> {
    return this.network.getData('http://stg-eclipse2.nuclious.in/spi/tower/detail/' + trackerId + '/' + towerNo);
  }

  postTowerConfigDetails(value: TowerConfig, trackerIdNo: number, towerNum: number): Observable<any> {
    const data = {
      trackerId: trackerIdNo,
      towerNo: towerNum,
      payload: value
    };
    console.log(data);
    return this.network.postData('http://stg-eclipse2.nuclious.in/spi/tower-detail/save', data);
  }

  getCompleteTowerDetail(trackerId: number, towerNo: number): Observable<any> {
    return this.network.getData('http://stg-eclipse2.nuclious.in/spi/complete/tower-detail/' + trackerId + '/' + towerNo);
  }
}
