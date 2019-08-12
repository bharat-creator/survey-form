import { AppService } from './../app-service';
import { TowerConfigService } from './tower-config.service';
import { Component, OnInit } from '@angular/core';
import { TowerConfig, PlumbingStructure } from './tower-config';
import { Router, NavigationEnd } from '@angular/router';

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
  navigationSubscription: any;

  constructor(private towerConfigService: TowerConfigService, private appService: AppService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();

    this.towerConfig = this.towerConfigFn();

    if (this.appService.getTowerDetails(this.towerNo) === undefined) {
      console.log('From Database');
      this.towerConfigService.getTowerDetail(this.trackerId, this.towerNo).subscribe((detail) => {
        if (detail.status === true) {
          this.towerConfig = detail.payload;
        }
        this.appService.setTowerDetails(this.towerConfig, this.towerNo);
      });
    } else {
      console.log('From Object');
      this.towerConfig = this.appService.getTowerDetails(this.towerNo);
    }

    if (this.towerNo === 1) {
      this.appService.setPrevUrl('soc/' + this.trackerId + '/detail/');
    } else {
      this.appService.setPrevUrl('/soc/' + this.trackerId + '/tower/' + (this.towerNo - 1) + '/config');
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
