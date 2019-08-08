import { AppService } from './../app-service';
import { TowerConfigService } from './tower-config.service';
import { Component, OnInit } from '@angular/core';
import { TowerConfig, PlumbingStructure } from './tower-config';

@Component({
  selector: 'app-tower-config',
  templateUrl: './tower-config.component.html',
  styleUrls: ['./tower-config.component.css']
})

export class TowerConfigComponent implements OnInit {
  towerConfig: TowerConfig;
  listOfPipeTypes = [{ type: 'cpvc' }, { type: 'upvc' }];
  listOfMaterialSize = [{ size: '1"' }, { size: '2"' }, { size: '3/4"' }];
  trackerId: number;
  towerNo: number;
  constructor(private towerConfigService: TowerConfigService, private appService: AppService) { }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();

    this.towerConfig = this.towerConfigFn();

    if (this.appService.getTowerDetails(this.towerNo) === undefined) {
      console.log('From Database');
      this.towerConfigService.getTowerDetail(this.trackerId, this.towerNo).subscribe((detail) => {
        if (detail.status === true) {
          this.towerConfig = detail.payload;
          this.appService.setTowerDetails(this.towerConfig, this.towerNo);
        }
      });
    } else {
      console.log('From Object');
      this.towerConfig = this.appService.getTowerDetails(this.towerNo);
    }

    this.appService.setPrevUrl('soc/' + this.trackerId + '/detail/');
    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/series/1/group/1');
  }

  towerConfigFn(): TowerConfig {
    return {
      towerName: '',
      noOfFloor: 0,
      noOfSeries: 0,
      replumbingReq: true,
      ringMainsChanged: false,
      plumbingStructure: [
        { name: 'Ring Mains', type: '', size: '' },
        { name: 'Down Comers', type: '', size: '' },
        { name: 'Tapping', type: '', size: '' }
      ]
    };
  }

}
