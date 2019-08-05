import { AppService } from './../app-service';
import { SeriesGrp, FlatGrp, InletGrp } from './series-group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class MeterByFloorService {

  private startFrom: number;
  private endTo: number;
  trackerId: number;
  towerNo: number;
  seriesNo: number;


  constructor(private appService: AppService) {
  }

  getEndToVal(): number {
    return this.endTo;
  }
  setEndToVal(value: number) {
    this.endTo = value;
  }

  getStartFromVal(): number {
    return this.startFrom;
  }

  setStartFromVal(value: number) {
    this.startFrom = value;
  }

  getMeterByFloorDetail(){
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
    this.seriesNo = this.appService.getSeriesNo();
    console.log(this.seriesNo);
  }


}
