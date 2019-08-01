import { TowerConfig, PlumbingStructure } from './tower-config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})

export class TowerConfigService {
    private towerConfig: TowerConfig;
    private plumbingStructure: PlumbingStructure[];
    constructor() {
        this.towerConfig = {
            towerName: 'Tower A',
            noOfFloor: 12,
            noOfSeries: 4,
            replumbingReq: true,
            ringMainsChanged: false,
            plumbingStructure: [
                { name: 'Ring Mains', type: 'cpvc', size: '1"'},
                { name: 'Down Comers', type: 'cpvc', size: '1"'},
                { name: 'Tapping', type: 'cpvc', size: '1"'}
            ],
            seriesGrp:[]
        };
    }

    getTowerDetail() {
      return this.towerConfig;
    }
}
