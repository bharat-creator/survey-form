import { AppService } from './../app-service';
import { CommonMtrService } from './common.service';
import { Component, OnInit } from '@angular/core';
import { CommonMeter } from './common';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  rowOfCommon: CommonMeter[];
  areaArr = ['Gym', 'Car Wash', 'Club House'];
  mtrArr = ['DN-15', 'DN-20', 'DN-25'];
  towerArr = ['Tower A', 'Tower B'];
  trackerId: number;

  constructor(private commonMtrService: CommonMtrService, private appService: AppService) { }

  ngOnInit() {
    this.rowOfCommon = [{ area: '', location: '', noOfQty: 1, mtrSpec: '' }];

    this.trackerId = this.appService.getTrackerId();

    this.appService.setPrevUrl('/soc/' + this.trackerId + '/tower/1/config');
    this.appService.setNextUrl('soc/' + this.trackerId + '/supply');

    if (this.appService.getCommonMtrDetails() === undefined) {
      console.log('From Database');
      this.commonMtrService.getDetail(this.trackerId).subscribe((socdetail) => {
        this.rowOfCommon = socdetail;
        this.appService.setCommonMtrDetails(this.rowOfCommon);
      });
    } else {
      console.log('From Object');
      this.rowOfCommon = this.appService.getCommonMtrDetails();
    }
  }

  addCRow() {
    this.rowOfCommon.push({ area: '', location: '', noOfQty: 1, mtrSpec: '' });
  }

  removeCRow(index: number) {
    this.rowOfCommon.splice(index, 1);
  }

}
