import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-scaffolding-civil-work',
  templateUrl: './scaffolding-civil-work.component.html',
  styleUrls: ['./scaffolding-civil-work.component.css']
})
export class ScaffoldingCivilWorkComponent implements OnInit {
  trackerId: number;
  towerNo: number;

  constructor(private appService: AppService) {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
  }

  ngOnInit() {
  }

}
