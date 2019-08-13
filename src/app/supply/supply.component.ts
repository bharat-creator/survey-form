import { Component, OnInit } from '@angular/core';
import { SupplyMeter } from './supply';
import { SupplyMtrService } from './supply.service';
import { AppService } from '../app-service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  rowOfSupply: SupplyMeter[];
  areaArr = ['Gym', 'Car Wash', 'Club House'];
  mtrArr = ['DN-15', 'DN-20', 'DN-25'];
  towerArr = ['Tower A', 'Tower B'];
  trackerId: number;

  constructor(private supplyMtrService: SupplyMtrService, private appService: AppService) { }

  ngOnInit() {
    this.rowOfSupply = [{ area: '', location: '', noOfQty: 1, mtrSpec: '' }];

    this.trackerId = this.appService.getTrackerId();

    this.appService.setPrevUrl('/soc/' + this.trackerId + '/common');
    this.appService.setNextUrl('soc/' + this.trackerId + '/safetyquestions');

    if (this.appService.getSupplyMtrDetails() === undefined) {
      console.log('From Database');
      this.supplyMtrService.getDetail(this.trackerId).subscribe((socdetail) => {
        this.rowOfSupply = socdetail;
        this.appService.setSupplyMtrDetails(this.rowOfSupply);
      });
    } else {
      console.log('From Object');
      this.rowOfSupply = this.appService.getSupplyMtrDetails();
    }
  }

  addCRow() {
    this.rowOfSupply.push({ area: '', location: '', noOfQty: 1, mtrSpec: '' });
  }

  removeCRow(index: number) {
    this.rowOfSupply.splice(index, 1);
  }

}
