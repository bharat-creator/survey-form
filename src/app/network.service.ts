import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  urlPrefix: string;
  constructor(private httpClient: HttpClient) {
    this.urlPrefix = ''; // environment.urlPrefix;
  }

  getData(url: string): Observable<any> {
    return this.httpClient.get<any>(this.urlPrefix + url, httpOptions)
           .pipe(catchError(this.handleError));
  }

  postData(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.httpClient.post<any>(this.urlPrefix + url, body, httpOptions)
            .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
