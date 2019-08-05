import { TowerConfig, PlumbingStructure } from './tower-config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AppService } from '../app-service';


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

  constructor(private appService: AppService) {
      this.towerConfig = {
          towerName: 'Tower A',
          noOfFloor: 12,
          noOfSeries: 4,
          replumbingReq: true,
          ringMainsChanged: false,
          plumbingStructure: [
              { name: 'Ring Mains', type: 'cpvc', size: '1"'},
              { name: 'Down Comers', type: 'cpvc', size: '1"'},
              { name: 'Tapping', type: 'cpvc', size: '1"'}
          ],
          seriesGrp:[]
      };
  }

  setNoOfFloors(value: number) {
    this.noOfFloor = value;
  }

  getNoOfFloors(): number {
    this.noOfFloor = this.towerConfig.noOfFloor;
    return this.noOfFloor;
  }

  setNoOfSeries(value: number) {
    this.noOfSeries = value;
  }

  getNoOfSeries(): number {
    this.noOfSeries = this.towerConfig.noOfSeries;
    return this.noOfSeries;
  }

  getTowerDetail() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
    this.appService.setPrevUrl('soc/' + this.trackerId + '/detail/');
    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/series/1/group/1');
    return this.towerConfig;
  }
}
