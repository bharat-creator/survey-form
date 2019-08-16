import { SeriesGrp } from './../meter-by-floor/series-group';
import { MeterByFloorService } from './../meter-by-floor/meter-by-floor.service';
import { TowerConfigService } from './../tower-config/tower-config.service';
import { TowerConfig } from './../tower-config/tower-config';
import { SocietyDetailsService } from './../society-details/society-details.service';
import { AppService } from './../app-service';
import { SocietyDetail } from './../society-details/society-details';
import { Component, OnInit } from '@angular/core';
import { TowerGroup } from '../survey-form';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  trackerId: number;
  towerNo: number;

  societyDetails: SocietyDetail;
  towerConfig: TowerConfig;
  towerArr: TowerGroup[];


  constructor(private appService: AppService, private societyDetailService: SocietyDetailsService,
    private towerConfigService: TowerConfigService, private mtrbyflr: MeterByFloorService) {
    this.towerArr = [];
    this.societyDetails = {
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

    this.towerConfig = {
      towerName: '',
      noOfFloor: 0,
      noOfSeries: 0,
      replumbingReq: false,
      ringMainsChanged: false,
      plumbingStructure: [
        { name: 'Ring Mains', type: '', size: '' },
        { name: 'Down Comers', type: '', size: '' },
        { name: 'Tapping', type: '', size: '' }
      ]
    };
  }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();
    this.SocietyDetail();
  }

  SocietyDetail() {
    if (this.appService.getSocietyDetails() === undefined) {
      this.societyDetailService.getSocietyDetail(this.trackerId).subscribe((socdetail) => {
        this.societyDetails = socdetail;
        this.appService.setSocietyDetails(this.societyDetails);
        this.towerNo = 1;
        this.towerConfigDetail(this.towerNo);
      });
    } else {
      this.societyDetails = this.appService.getSocietyDetails();
      this.towerNo = 1;
      this.towerConfigDetail(this.towerNo);
    }

    this.towerConfigService.getCompleteTowerDetail(2, 1).subscribe((detail) => {
      console.log(detail);
    });
  }

  // towerLoop() {
  //   for (let i = 1; i <= this.societyDetails.noOfTowersForSurvey; i++) {
  //     this.towerConfigDetail(i);
  //   }
  // }

  towerConfigDetail(towerNo: number) {
    if (this.appService.getTowerDetails(towerNo) === undefined) {
      console.log('From Database');
      this.towerConfigService.getTowerDetail(this.trackerId, towerNo).subscribe((detail) => {
        if (detail.status === true) {
          const towerConfig = detail.payload;
          this.appService.setTowerDetails(towerConfig, towerNo);
          this.pushTowerConfig(towerNo, towerConfig);
          if (towerNo < this.societyDetails.noOfTowersForSurvey) {
            this.towerNo += 1;
            // console.log('TowerNo' + this.towerNo);
            this.towerConfigDetail(this.towerNo);
          } else {
            // console.log('End On Database');
          }
        }
      });
    } else {
      console.log('From Object');
      const towerConfig = this.appService.getTowerDetails(towerNo);
      this.pushTowerConfig(towerNo, towerConfig);
      if (towerNo < this.societyDetails.noOfTowersForSurvey) {
        this.towerNo += 1;
        // console.log('TowerNo' + this.towerNo);
        this.towerConfigDetail(this.towerNo);
      } else {
        // console.log('End On Object');
      }
    }
  }

  pushTowerConfig(towerNum: number, value) {
    const data = {
      towerNo: towerNum,
      towerDetails: value,
      seriesGrp: this.seriesObj(),
      yStrainer: {}
    };
    this.towerArr.push(data);
    // console.log(this.towerArr);
  }

  seriesDetailGroup() {
    const towerNo = 1;
    const seriesNo = 1;
    const groupNo = 1;
    if (this.appService.getGroupDataFromObj(towerNo, seriesNo, groupNo) === undefined) {
      this.mtrbyflr.getMeterByFloorDetail(this.trackerId, towerNo, seriesNo, groupNo).subscribe((detail) => {
        if (detail.status === true) {
          const flatGrp = detail.payload;
          this.appService.setGroupDetail(flatGrp);
        }
      });
    } else {
      const flatGrp = this.appService.getGroupDataFromObj(towerNo, seriesNo, groupNo);
    }
  }

  seriesObj(): SeriesGrp[] {
    const seriesarr = [
      {
        seriesNo: 1,
        flatGrp: [
          {
            flatType: '2BHK',
            from: 1,
            groupNo: 1,
            jointFlat: '',
            jointSeries: 0,
            to: 2101,
            inletGrp: [
              {
                inlet: 'S',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'B1&B2',
                type: 'cold',
                meter: 'DN-15'
              }
            ]
          },
          {
            flatType: '2BHK',
            from: 2201,
            groupNo: 2,
            inletGrp: [
              {
                inlet: 'S',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'K&M',
                type: 'cold',
                meter: 'DN-15'
              }
            ],
            jointFlat: '',
            jointSeries: 0,
            to: 3301
          }
        ]
      },
      {
        seriesNo: 2,
        flatGrp: [
          {
            flatType: '3BHK',
            from: 2,
            groupNo: 1,
            inletGrp: [
              {
                inlet: 'B3',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'B1&B2',
                type: 'cold',
                meter: 'DN-15'
              }
            ],
            jointFlat: '',
            jointSeries: 0,
            to: 1902
          },
          {
            flatType: '4BHK',
            from: 2002,
            groupNo: 2,
            inletGrp: [
              {
                inlet: 'B3',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'S',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'M',
                type: 'cold',
                meter: 'DN-15'
              }
            ],
            jointFlat: '',
            jointSeries: 0,
            to: 2502
          },
          {
            flatType: '3BHK',
            from: 2602,
            groupNo: 3,
            inletGrp: [
              {
                inlet: 'S',
                type: 'cold',
                meter: 'DN-15'
              },
              {
                inlet: 'K&M',
                type: 'cold',
                meter: 'DN-15'
              }
            ],
            jointFlat: '',
            jointSeries: 0,
            to: 3302
          }
        ]
      }
    ];

    return seriesarr;
  }

}
