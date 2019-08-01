import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  headers: Headers;
  options: RequestOptions;
  urlPrefix: string;
  constructor(private http: Http) {
    this.urlPrefix = environment.urlPrefix;
  }

  getData(url: string, username): Observable<any> {
    let header = new Headers();
    let option = new RequestOptions({ headers: header });
    return this.http
      .get(this.urlPrefix + url, option)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postData(url: string, param: any, username): Observable<any> {
    let header = new Headers({ 'auth-token': 'edb748be-015a-4b12-9a3e-92c384016ece' });
    header.append('username', username);
    let option = new RequestOptions({ method: 'post', headers: header });
    let body = JSON.stringify(param);
    return this.http
      .post(this.urlPrefix + url, param, option)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error._body);
  }
}
