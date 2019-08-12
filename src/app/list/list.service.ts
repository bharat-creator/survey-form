import { ListOfSurvey } from './list';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  constructor(private httpClient: HttpClient) {  }
  getListOfSurvey(): Observable<ListOfSurvey> {
  return this.httpClient.get<ListOfSurvey>('http://stg-eclipse2.nuclious.in/spi/getsurvey');
 }
}
