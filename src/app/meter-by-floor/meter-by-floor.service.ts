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
  flatGrp: FlatGrp;

  constructor(private appService: AppService) {
  }

  FlatGrp(): FlatGrp {
    return {
      groupNo: this.appService.getGroupNo(),
      from: this.startFrom,
      to: this.endTo,
      flatType: '4BHK',
      jointSeries: 0,
      jointFlat: '',
      inletGrp: []
    };
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

  getMeterByFloorDetail(): Observable<FlatGrp>{
    // this.trackerId = this.appService.getTrackerId();
    // this.towerNo = this.appService.getTowerNo();
    // this.seriesNo = this.appService.getSeriesNo();

    return Observable.of(this.FlatGrp());
  }


}
