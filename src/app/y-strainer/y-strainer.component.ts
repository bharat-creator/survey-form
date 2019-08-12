import { TowerConfigService } from './../tower-config/tower-config.service';
import { YStrainerService } from './y-strainer.service';
import { AppService } from './../app-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-y-strainer',
  templateUrl: './y-strainer.component.html',
  styleUrls: ['./y-strainer.component.css']
})
export class YStrainerComponent implements OnInit {
  trackerId: number;
  towerNo: number;
  pipeType = ['CPVC', 'UPVC'];
  pipeSize = ['1"', '1(1/2)"', '2"', '2(1/2)"'];

  items = ['Elbow', 'MTA', 'FTA'];
  itemSize = ['1"', '1(1/2)"', '2"', '2(1/2)"'];

  rowOfYstrainer = [{ pipeType: '', pipeSize: '', noOfQty: 0 }];
  rowOfItems = [{ itemName: '', itemSize: '', itemQty: 0 }];

  constructor(private appService: AppService, private towerConfigService: TowerConfigService, 
              private yStrainerService: YStrainerService) { }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();

    if (this.appService.getNoOfFloors(this.towerNo) === undefined) {

      this.towerConfigService.getTowerDetail(this.trackerId, this.towerNo).subscribe((detail) => {
        if (detail.status === true) {
          const towerConfig = detail.payload;
          this.appService.setTowerDetails(towerConfig, this.towerNo);
          this.afterTowerDetial();
        } else {
          // Redirect To Tower Page
        }
      });
    } else {
      this.afterTowerDetial();
    }
  }

  afterTowerDetial() {
    if (this.appService.getYStrainerDetails() === undefined) {
      console.log('From Database');
      this.yStrainerService.getYStrainerDetail(this.trackerId, this.towerNo).subscribe((detail) => {
        if (detail.status === true) {
          this.rowOfYstrainer = detail.payload.yStrainer;
          this.rowOfItems = detail.payload.additionalItems;
        }
        const ystrainerDetail = { yStrainer: this.rowOfYstrainer, additionalItems: this.rowOfItems };
        this.appService.setYStrainerDetails(ystrainerDetail);
      });
    } else {
      const payload = this.appService.getYStrainerDetails();
      this.rowOfYstrainer = payload.yStrainer;
      this.rowOfItems = payload.additionalItems;
    }

    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/scaffolding&civil');
    this.appService.setPrevUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/config');
  }

  addYRow() {
    this.rowOfYstrainer.push({ pipeType: '', pipeSize: '', noOfQty: 0 });
  }

  removeYRow(index: number) {
    this.rowOfYstrainer.splice(index, 1);
  }

  addIRow() {
    this.rowOfItems.push({ itemName: '', itemSize: '', itemQty: 0 });
  }

  removeIRow(index: number) {
    this.rowOfItems.splice(index, 1);
  }
}
