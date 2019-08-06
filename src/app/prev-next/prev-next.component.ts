import { AppService } from './../app-service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appservice: AppService) {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.trackerId = parseInt(params.get('trackerId'), 10);
      this.appservice.setTrackerId(Number(this.trackerId));

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
    console.log(this.prevUrl);
    this.router.navigate([this.prevUrl]);
  }

  nextBtn() {
    this.nextUrl = this.appservice.getNextUrl();
    this.router.navigate([this.nextUrl]);
  }
}
