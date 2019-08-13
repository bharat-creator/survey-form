import { AppService } from './../app-service';
import { TowerConfigService } from './tower-config.service';
import { Component, OnInit, Input } from '@angular/core';
import { TowerConfig, PlumbingStructure } from './tower-config';

@Component({
  selector: 'app-tower-config',
  templateUrl: './tower-config.component.html',
  styleUrls: ['./tower-config.component.css']
})

export class TowerConfigComponent implements OnInit {
  @Input() towerConfig: TowerConfig;
  listOfPipeTypes = [{ type: 'cpvc' }, { type: 'upvc' }];
  listOfMaterialSize = [{ size: '1"' }, { size: '2"' }, { size: '3/4"' }];
  trackerId: number;
  towerNo: number;
  navigationSubscription: any;

  constructor(private towerConfigService: TowerConfigService, private appService: AppService) {
  }

  ngOnInit() {
    this.initialiseInvites();
  }


  initialiseInvites() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();

    this.towerConfig = this.towerConfigFn();
    console.log(this.towerNo);
    console.log(this.appService.getTowerDetails(this.towerNo));
    if (this.appService.getTowerDetails(this.towerNo) === undefined) {
      console.log('From Database');
      this.towerConfigService.getTowerDetail(this.trackerId, this.towerNo).subscribe((detail) => {
        if (detail.status === true) {
          this.towerConfig = detail.payload;
          console.log('found');
        }
        this.appService.setTowerDetails(this.towerConfig, this.towerNo);
        console.log(this.towerNo);
      });
    } else {
      console.log('From Object');
      this.towerConfig = this.appService.getTowerDetails(this.towerNo);
    }

    if (this.towerNo === 1) {
      this.appService.setPrevUrl('soc/' + this.trackerId + '/detail/');
    } else {
      this.appService.setPrevUrl('/soc/' + this.trackerId + '/tower/' + (this.towerNo - 1) + '/scaffolding&civil');
    }

    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/series/1/group/1');
  }

  towerConfigFn(): TowerConfig {
    return {
      towerName: '',
      noOfFloor: 0,
      noOfSeries: 0,
      replumbingReq: false,
      ringMainsChanged: false,
      plumbingStructure: [
        { name: 'Ring Mains', type: '', size: '' },
        { name: 'Down Comers', type: '', size: '' },
        { name: 'Tapping', type: '', size: '' }
      ]
    };
  }

}
