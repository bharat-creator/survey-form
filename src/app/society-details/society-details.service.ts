import { AppService } from './../app-service';
import { SocietyDetail } from './society-details';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class SocietyDetailsService {
  trackerId: number;
  constructor(private appService: AppService) {

  }

  getSocietyDetail(): Observable<SocietyDetail> {
    this.trackerId = this.appService.getTrackerId();
    this.appService.setPrevUrl('/list');
    this.appService.setNextUrl('soc/' + this.trackerId + '/tower/1/config');
    return Observable.of({
      name: 'zcdczdc',
      address: 'dadada',
      pincode: 0,
      city: 'Bengaluru',
      state: 'Karnataka',
      fmName: '',
      fmPhone: 0,
      plmbrName: '',
      plmbrPhone: 0,
      noOfTowers: 0,
      noOfApts: 0,
      noOfTowersForSurvey: 0
    });
  }

}
