import { AppService } from './../app-service';
import { SocietyDetail } from './society-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SocietyDetailsService {
  trackerId: number;
  constructor(private appService: AppService, private httpClient: HttpClient) {

  }

  getSocietyDetail(): Observable<SocietyDetail> {
    this.trackerId = this.appService.getTrackerId();
    return this.httpClient.get<SocietyDetail>('http://stg-eclipse2.nuclious.in/spi/society/detail/'+this.trackerId);
  }

  postSocietyDetails(value: SocietyDetail): Observable<any> {
    this.trackerId = this.appService.getTrackerId();
    const body = new FormData();
    body.append('trackerId', JSON.stringify(this.trackerId));
    body.append('payload', JSON.stringify(value));

    return this.httpClient.post('https://postb.in/1565089539271-6688349558971', value,
    {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    });
  }

}
