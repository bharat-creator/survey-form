import { AppService } from './../app-service';
import { Component, OnInit } from '@angular/core';
import { SocietyDetail } from './society-details';
import { SocietyDetailsService } from './society-details.service';

@Component({
  selector: 'app-society-details',
  templateUrl: './society-details.component.html',
  styleUrls: ['./society-details.component.css']
})





export class SocietyDetailsComponent implements OnInit {

  societyDetails: SocietyDetail;
  listOfStates: any;
  listOfCities: any;
  trackerId: number;

  constructor(private societyDetailService: SocietyDetailsService, private appService: AppService) {
    this.societyDetails = this.societyDetail();

  }

  societyDetail() {
    return {
      name: '',
      address: '',
      pincode: 0,
      city: '',
      state: '',
      fmName: '',
      fmPhone: 0,
      plmbrName: '',
      plmbrPhone: 0,
      noOfTowers: 0,
      noOfApts: 0,
      noOfTowersForSurvey: 0
    };
  }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.appService.setPrevUrl('/list');
    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/1/config');

    if (this.appService.getSocietyDetails() === undefined) {
      console.log('From Database');
      this.societyDetailService.getSocietyDetail().subscribe((socdetail) => {
        this.societyDetails = socdetail;
        this.appService.setSocietyDetails(this.societyDetails);
      });
    } else {
      console.log('From Object');
      this.societyDetails = this.appService.getSocietyDetails();
    }

    this.listOfCities = [{ name: 'Bengaluru' }, { name: 'Chennai' }];
    this.listOfStates = [{ name: 'Karnataka' }, { name: 'Maharashtra' }];

  }

}
