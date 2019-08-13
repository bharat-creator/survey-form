import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { NetworkService } from '../network.service';
import { CommonMeter } from './common';

@Injectable({
  providedIn: 'root'
})

export class CommonMtrService {
  trackerId: number;
  rowOfCommon = [{ area: '', location: '', noOfQty: 1, mtrSpec: '' }];
  constructor(private network: NetworkService) {

  }

  getDetail(trackerId: number): Observable<CommonMeter[]> {
    return Observable.of(this.rowOfCommon);
    //return this.network.getData('http://stg-eclipse2.nuclious.in/spi/society/detail/' + trackerId);
  }

  postDetail(value, trackerIdNum: number): Observable<any> {
    const data = {
      trackerId: trackerIdNum,
      payload: value
    };
    return this.network.postData('http://stg-eclipse2.nuclious.in/spi/society-detail/save', data);
  }
}
