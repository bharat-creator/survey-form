import { AppService } from './../app-service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
  navigationSubscription: any;
  constructor(private router: Router, private appService: AppService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.StepOnInit();
      }
    });
  }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
    this.seriesNo = this.appService.getSeriesNo();
    this.groupNo = this.appService.getGroupNo();
  }

  StepOnInit() {
    const urlArr = this.router.url.split('/');
    if (urlArr[3] === 'detail') {
      this.stepcss = 'society_details';
    } else if (urlArr[3] === 'tower' && (urlArr[5] === 'config' || urlArr[5] === 'series')) {
      this.stepcss = 'meter_by_floor';
    } else if (urlArr[3] === 'tower' && urlArr[5] === 'ystrainer') {
      this.stepcss = 'y_strainer';
    } else if (urlArr[3] === 'tower' && urlArr[5] === 'scaffolding&civil') {
      this.stepcss = 'scaffolding_civil';
    } else if (urlArr[3] === 'common&supply') {
      this.stepcss = 'common_supply';
    }
  }

}
