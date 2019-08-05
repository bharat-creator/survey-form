import { ListOfSurvey } from './list';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  private ListOfService: ListOfSurvey[];
  constructor() { }

  getListOfSurvey(): Observable<ListOfSurvey[]> {
    this.ListOfService = [
        {
            trackerId: 67,
            name: 'Society Name',
            address: 'Society Address',
            scheduleTime: '2019-07-06',
            contactName: 'Praveen',
            contactPhone: 9021301537,
            csmName: 'Dhrumit',
            csmPhone: 1234567890
        },
        {
            trackerId: 68,
            name: 'Society Name',
            address: 'Society Address',
            scheduleTime: '2019-07-06',
            contactName: 'Praveen',
            contactPhone: 9021301537,
            csmName: 'Dhrumit',
            csmPhone: 1234567890
        }
    ];
    return Observable.of(this.ListOfService);
  }
}
