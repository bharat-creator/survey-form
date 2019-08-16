import { Observable } from 'rxjs/Observable';
import { SocietyDetailsService } from './../society-details/society-details.service';
import { AppService } from './../app-service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TowerConfigService } from '../tower-config/tower-config.service';
import { MeterByFloorService } from '../meter-by-floor/meter-by-floor.service';
import { YStrainerService } from '../y-strainer/y-strainer.service';
import { CommonMtrService } from '../common/common.service';
import { ModalService } from '../modal/modal.service';

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
  urlArr: Array<string>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appService: AppService,
              private societyDetailService: SocietyDetailsService, private towerConfig: TowerConfigService,
              private mtrbyflr: MeterByFloorService, private yStrainerService: YStrainerService,
              private commonMtrService: CommonMtrService, private modalService: ModalService ) {

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
      if (isNaN(this.towerNo)) {
        if (this.appService.getTowerNo() === undefined) {
          this.appService.setTowerNo(1);
        }
      } else {
        this.appService.setTowerNo(Number(this.towerNo));
      }

      this.seriesNo = parseInt(params.get('seriesNo'), 10);
      this.appService.setSeriesNo(Number(this.seriesNo));

      this.groupNo = parseInt(params.get('groupNo'), 10);
      this.appService.setGroupNo(Number(this.groupNo));
    });
  }

  ngOnInit() {
    this.urlArr = this.router.url.split('/');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  nextFromModal() {
    this.nextUrl = this.appService.getNextUrl();
    this.router.navigate([this.nextUrl]);
  }

  prevBtn() {
    this.prevUrl = this.appService.getPrevUrl();
    this.router.navigate([this.prevUrl]);
  }

  nextBtn() {
    this.save().subscribe((detail) => {
      // console.log(detail);
      this.nextUrl = this.appService.getNextUrl();
      if ((this.urlArr[3] === 'tower' && this.urlArr[5] === 'scaffolding&civil')
          && (this.towerNo >= 1 && this.towerNo < this.appService.getNoOfTowersForSurvey())) {
        this.openModal('custom-modal-1');
      } else {
        this.router.navigate([this.nextUrl]);
      }
    },
    (error) => {
      console.log(error);
    });
  }


  save(): Observable<any> {
    //const urlArr = this.router.url.split('/');
    if (this.urlArr[3] === 'detail') {
      const value = this.appService.getSocietyDetails();
      console.log(value);
      return this.societyDetailService.postSocietyDetails(value, this.trackerId);
    } else if (this.urlArr[3] === 'tower' && this.urlArr[5] === 'config') {
      const value = this.appService.getTowerDetails(this.towerNo);
      console.log(this.appService.getSurveyFormObj());
      return this.towerConfig.postTowerConfigDetails(value, this.trackerId, this.towerNo);
    } else if (this.urlArr[3] === 'tower' && this.urlArr[5] === 'series') {
      const value = this.appService.getGroupDetails();
      console.log(value);
      return this.mtrbyflr.postGroupDetails(value, this.trackerId, this.towerNo, this.seriesNo, this.groupNo);
    } else if (this.urlArr[3] === 'tower' && this.urlArr[5] === 'ystrainer') {
      const value = this.appService.getYStrainerDetails(this.towerNo);
      console.log(value);
      return this.yStrainerService.postYStrainerDetail(value, this.trackerId, this.towerNo);
    } else if (this.urlArr[3] === 'tower' && this.urlArr[5] === 'scaffolding&civil') {
      return Observable.of(true);
    } else if (this.urlArr[3] === 'common') {
      const value = this.appService.getCommonMtrDetails();
      console.log(value);
      // return this.commonMtrService.postDetail(value, this.trackerId);
      return Observable.of(true);
    } else if (this.urlArr[3] === 'supply') {
      const value = this.appService.getSupplyMtrDetails();
      console.log(value);
      // return this.supplyMtrService.postDetail(value, this.trackerId);
      return Observable.of(true);
    } else if (this.urlArr[3] === 'safetyquestions') {
      return Observable.of(true);
    } else if (this.urlArr[3] === 'customerinput') {
      return Observable.of(true);
    }
    // return false;
  }
}
