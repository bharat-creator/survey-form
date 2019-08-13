import { NetworkService } from './../network.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})

export class YStrainerService {

    rowOfYstrainer = [{ pipeType: '', pipeSize: '', noOfQty: 0 }];
    rowOfItems = [{ itemName: '', itemSize: '', itemQty: 0 }];

    constructor(private network: NetworkService) {

    }

    getYStrainerDetail(trackerId: number, towerNo: number): any {
       return this.network.getData('http://stg-eclipse2.nuclious.in/spi/ystrainer/' + trackerId + '/' + towerNo);
    }

    postYStrainerDetail(value: any, trackerIdNum: number, towerNum: number) {
        const data = {
            trackerId: trackerIdNum,
            towerNo: towerNum,
            payload: value
        };
        return this.network.postData('http://stg-eclipse2.nuclious.in/spi/ystrainer/save', data);
        //return Observable.of(true);
    }
}
