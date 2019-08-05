import { AppService } from './../app-service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    this.trackerId = this.activatedRoute.snapshot.params.trackerId;
    this.appservice.setTrackerId(Number(this.trackerId));

    this.towerNo = this.activatedRoute.snapshot.params.towerNo;
    this.appservice.setTowerNo(Number(this.towerNo));

    this.seriesNo = this.activatedRoute.snapshot.params.seriesNo;
    this.appservice.setSeriesNo(Number(this.seriesNo));

    this.groupNo = this.activatedRoute.snapshot.params.groupNo;
    this.appservice.setGroupNo(Number(this.groupNo));
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
    console.log(this.nextUrl);
    this.router.navigate([this.nextUrl]);
  }
}
