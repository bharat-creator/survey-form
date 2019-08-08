import { SocietyDetailsService } from './../society-details/society-details.service';
import { AppService } from './../app-service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { TowerConfigService } from '../tower-config/tower-config.service';
import { MeterByFloorService } from '../meter-by-floor/meter-by-floor.service';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.css']
})


export class PrevNextComponent implements OnInit {
  trackerId: number;
  towerNo: number;
  seriesNo: number;
  groupNo: number;
  prevUrl: string;
  nextUrl: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appService: AppService,
              private societyDetailService: SocietyDetailsService, private towerConfig: TowerConfigService,
              private mtrbyflr: MeterByFloorService) {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.trackerId = parseInt(params.get('trackerId'), 10);

      if (this.appService.getTrackerId() === undefined) {
        this.appService.setTrackerId(Number(this.trackerId));
        this.appService.resetSurveyFormObj(); // No Need Of Reseting
      } else if (this.appService.getTrackerId() !== this.trackerId) {
        this.appService.setTrackerId(Number(this.trackerId));
        this.appService.resetSurveyFormObj();
      } else {
        this.appService.setTrackerId(Number(this.trackerId));
      }

      this.towerNo = parseInt(params.get('towerNo'), 10);
      this.appService.setTowerNo(Number(this.towerNo));

      this.seriesNo = parseInt(params.get('seriesNo'), 10);
      this.appService.setSeriesNo(Number(this.seriesNo));

      this.groupNo = parseInt(params.get('groupNo'), 10);
      this.appService.setGroupNo(Number(this.groupNo));
    });
  }

  ngOnInit() {
  }

  prevBtn() {
    this.prevUrl = this.appService.getPrevUrl();
    this.router.navigate([this.prevUrl]);
  }

  nextBtn() {
    this.save().subscribe((detail) => {
      console.log(detail);
      this.nextUrl = this.appService.getNextUrl();
      this.router.navigate([this.nextUrl]);
    },
    (error) => {
      console.log(error);
    });
  }


  save(): Observable<any> {
    const urlArr = this.router.url.split('/');
    if (urlArr[3] === 'detail') {
      const value = this.appService.getSocietyDetails();
      console.log(value);
      return this.societyDetailService.postSocietyDetails(value, this.trackerId);
    } else if (urlArr[3] === 'tower' && urlArr[5] === 'config') {
      const value = this.appService.getTowerDetails(this.towerNo);
      console.log(value);
      return this.towerConfig.postTowerConfigDetails(value);
    } else if (urlArr[3] === 'tower' && urlArr[5] === 'series') {
      const value = this.appService.getGroupDetails();
      console.log(value);
      return this.mtrbyflr.postGroupDetails(value, this.trackerId, this.towerNo, this.seriesNo, this.groupNo);
    }
    // return false;
  }
}
