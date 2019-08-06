import { SocietyDetailsService } from './../society-details/society-details.service';
import { AppService } from './../app-service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appservice: AppService,
              private societyDetailService: SocietyDetailsService) {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.trackerId = parseInt(params.get('trackerId'), 10);

      if (this.appservice.getTrackerId() === undefined) {
        this.appservice.setTrackerId(Number(this.trackerId));
        this.appservice.resetFormObject(); // No Need Of Reseting
      } else if (this.appservice.getTrackerId() !== this.trackerId) {
        this.appservice.setTrackerId(Number(this.trackerId));
        this.appservice.resetFormObject();
      } else {
        this.appservice.setTrackerId(Number(this.trackerId));
      }

      this.towerNo = parseInt(params.get('towerNo'), 10);
      this.appservice.setTowerNo(Number(this.towerNo));

      this.seriesNo = parseInt(params.get('seriesNo'), 10);
      this.appservice.setSeriesNo(Number(this.seriesNo));

      this.groupNo = parseInt(params.get('groupNo'), 10);
      this.appservice.setGroupNo(Number(this.groupNo));
    });
  }

  ngOnInit() {
  }

  prevBtn() {
    this.prevUrl = this.appservice.getPrevUrl();
    this.router.navigate([this.prevUrl]);
  }

  nextBtn() {
    const saved: any = this.save();
    if (saved) {
      this.nextUrl = this.appservice.getNextUrl();
      this.router.navigate([this.nextUrl]);
    }
  }

  save(): any {
    const urlArr = this.router.url.split('/');
    if (urlArr[3] === 'detail')  {
      const value = this.appservice.getSocietyDetails();
      return this.societyDetailService.postSocietyDetails(value);
    }
  }
}
