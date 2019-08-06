import { AppService } from './../app-service';
import { SocietyDetail } from './society-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SocietyDetailsService {
  trackerId: number;
  constructor(private appService: AppService,private httpClient:HttpClient) {

  }

  getSocietyDetail(): Observable<SocietyDetail> {
    this.trackerId = this.appService.getTrackerId();
    this.appService.setPrevUrl('/list');
    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/1/config');
    return this.httpClient.get<SocietyDetail>('http://stg-eclipse2.nuclious.in/spi/society/detail/'+this.trackerId);
  }

}
