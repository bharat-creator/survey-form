import { SocietyDetail } from './society-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { NetworkService } from '../network.service';

@Injectable({
  providedIn: 'root'
})

export class SocietyDetailsService {
  trackerId: number;

  constructor(private network: NetworkService) {

  }

  getSocietyDetail(trackerId: number): Observable<any> {
    return this.network.getData('http://stg-eclipse2.nuclious.in/spi/society/detail/' + trackerId);
  }

  postSocietyDetails(value: SocietyDetail): Observable<any> {
    // this.trackerId = this.appService.getTrackerId();
    const body = new FormData();
    body.append('trackerId', JSON.stringify(this.trackerId));
    body.append('payload', JSON.stringify(value));
    return this.network.postData('http://stg-eclipse2.nuclious.in/spi/society-detail/save', value);
  }
}
