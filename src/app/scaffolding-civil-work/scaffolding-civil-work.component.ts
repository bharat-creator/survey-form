import { SocietyDetailsService } from './../society-details/society-details.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service';
import { SocietyDetail } from '../society-details/society-details';

@Component({
  selector: 'app-scaffolding-civil-work',
  templateUrl: './scaffolding-civil-work.component.html',
  styleUrls: ['./scaffolding-civil-work.component.css']
})
export class ScaffoldingCivilWorkComponent implements OnInit {
  trackerId: number;
  towerNo: number;
  societyDetails: SocietyDetail;

  constructor(private appService: AppService, private societyDetailService: SocietyDetailsService) {

  }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();

    if (this.appService.getSocietyDetails() === undefined) {
      console.log('From Database');
      this.societyDetailService.getSocietyDetail(this.trackerId).subscribe((socdetail) => {
        this.societyDetails = socdetail;
        this.appService.setSocietyDetails(this.societyDetails);
        this.navUrl();
      });
    } else {
      console.log('From Object');
      this.societyDetails = this.appService.getSocietyDetails();
      this.navUrl();
    }
  }

  navUrl() {
    if (this.societyDetails.noOfTowersForSurvey === this.towerNo) {
      this.appService.setNextUrl('/soc/' + this.trackerId + '/common&supply');
    } else {
      this.appService.setNextUrl('/soc/' + this.trackerId + '/tower/' + (this.towerNo + 1) + '/config');
    }
    this.appService.setPrevUrl('/soc/' + this.trackerId + '/tower/' + this.towerNo + '/ystrainer');
  }

}
