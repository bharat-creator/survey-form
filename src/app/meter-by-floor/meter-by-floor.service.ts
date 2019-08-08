import { NetworkService } from './../network.service';
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
  private swapFromTo: number;
  trackerId: number;
  towerNo: number;
  seriesNo: number;
  flatGrp: FlatGrp;

  constructor(private appService: AppService, private network: NetworkService) {
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

  getSwapFromTo(): number {
    return this.swapFromTo;
  }

  setSwapFromTo(value: number) {
    this.swapFromTo = value;
  }

  getMeterByFloorDetail(trackerId: number, towerNo: number, seriesNo: number, groupNo: number): Observable<any> {
    return this.network.getData('http://stg-eclipse2.nuclious.in/spi/mbf/detail/' + trackerId + '/' + towerNo + '/'
     + seriesNo + '/' + groupNo);
  }

  postGroupDetails(value: FlatGrp, trackerIdNum: number, towerNum: number, seriesNum: number, groupNum: number): Observable<any> {
    const data = {
      trackerId: trackerIdNum,
      towerNo: towerNum,
      seriesNo: seriesNum,
      groupNo: groupNum,
      payload: value
    };
    return Observable.of(true); //this.network.postData('http://stg-eclipse2.nuclious.in/spi/society-detail/save', data);
  }


}
