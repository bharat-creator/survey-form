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
  constructor(private societyDetailService: SocietyDetailsService) {
  }

  ngOnInit() {
    this.societyDetailService.getSocietyDetail().subscribe((socdetail) => {
      this.societyDetails = socdetail;
      console.log(this.societyDetails);
    });

    this.listOfCities = [{name: 'Bengaluru'}, {name: 'Chennai'}];
    this.listOfStates = [{name: 'Karnataka'}, { name: 'Maharashtra'}];

    console.log(this.societyDetails);
  }

}
