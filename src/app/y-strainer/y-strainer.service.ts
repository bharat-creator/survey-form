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
    //  return this.network.getData('http://stg-eclipse2.nuclious.in/spi/mbf/detail/' + trackerId + '/' + towerNo);
        const payloadData = { yStrainer: this.rowOfYstrainer, additionalItems: this.rowOfItems };
        const data = {
            status: true,
            payload: payloadData
        }
        return Observable.of(data);
    }

    postYStrainerDetail(value: any, trackerIdNum: number, towerNum: number) {
        const data = {
            trackerId: trackerIdNum,
            towerNo: towerNum,
            payload: value
        };
        //return this.network.postData('http://stg-eclipse2.nuclious.in/spi/mbf-detail/save', data);
        return Observable.of(true);
    }
}
