import { AppService } from './../app-service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-nav',
  templateUrl: './step-nav.component.html',
  styleUrls: ['./step-nav.component.css']
})
export class StepNavComponent implements OnInit {
  stepcss = 'society_details';
  trackerId: number;
  towerNo: number;
  seriesNo: number;
  groupNo: number;
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
    this.seriesNo = this.appService.getSeriesNo();
    this.groupNo = this.appService.getGroupNo();

    const urlArr = this.router.url.split('/');
    if (urlArr[3] === 'detail') {
      this.stepcss = 'society_details';
    } else if (urlArr[3] === 'tower' && (urlArr[5] === 'config' || urlArr[5] === 'series')) {
      this.stepcss = 'meter_by_floor';
    } else if (urlArr[3] === 'tower' && urlArr[5] === 'ystrainer') {
      this.stepcss = 'y_strainer';
    }
  }

}
