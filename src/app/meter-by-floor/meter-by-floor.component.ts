import { AppService } from './../app-service';
import { MeterByFloorService } from './meter-by-floor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeriesGrp, FlatGrp, InletGrp } from './series-group';
import { AppComponent } from '../app.component';
import { TowerConfigService } from '../tower-config/tower-config.service';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-meter-by-floor',
  templateUrl: './meter-by-floor.component.html',
  styleUrls: ['./meter-by-floor.component.css']
})
export class MeterByFloorComponent implements OnInit, OnDestroy {

  trackerId: number;
  towerNo: number;
  seriesNo: number;
  groupNo: number;
  newInletAdded: string;
  chooseFlatArray = [];
  chooseInletArray = [];
  selectedInlet = [];
  showCombineBox = false;
  combineType = '&';
  firstInlet = '';
  secondInlet = '';

  flatGrp: FlatGrp;
  typeOfFlat = [{ type: '1BHK' }, { type: '2BHK' }, { type: '3BHK' }, { type: '4BHK' }, { type: 'Villa' }];
  typeOfInlet = [{ inlet: 'K' }, { inlet: 'M' }, { inlet: 'B1' }, { inlet: 'B2' }, { inlet: 'U' }, { inlet: 'S' }];
  
  noOfFloors: number;
  navigationSubscription: any;

  constructor(private parent: AppComponent, private mtrbyflr: MeterByFloorService,
              private towerConfig: TowerConfigService, private appService: AppService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  initialiseInvites() { 
    this.chooseFlatArray = [];
    this.chooseInletArray = [];
    this.selectedInlet = [];
    this.magicalLogicFn();
    this.flatGrp = this.FlatGrp();
    this.onFlatCombineChange();
  }

  magicalLogicFn() {
    this.seriesNo = this.appService.getSeriesNo();
    this.noOfFloors = this.towerConfig.getNoOfFloors();

    this.mtrbyflr.setStartFromVal(this.seriesNo);
    this.mtrbyflr.setEndToVal(((this.noOfFloors - 1) * 100) + this.seriesNo);

    for (let i = 1; i <= this.noOfFloors; i++) {
      this.chooseFlatArray.push(((i - 1) * 100) + this.seriesNo);
    }
  }

  ngOnInit() {
  }

  FlatGrp() {
    return {
      from: this.mtrbyflr.getStartFromVal(),
      to: this.mtrbyflr.getEndToVal(),
      flatType: '2BHK',
      jointSeries: 0,
      jointFlat: '',
      inletGrp: [

      ]
    };
  }

  onFlatCombineChange() {
    console.log('count');
    this.nextPageUrl();
  }

  nextPageUrl() {
    this.trackerId = this.appService.getTrackerId();
    this.towerNo = this.appService.getTowerNo();
    this.seriesNo = this.appService.getSeriesNo();
    this.groupNo = this.appService.getGroupNo();
    console.log('Series' + this.seriesNo);
    // group completed
    if (!this.groupCompleted()) {

      this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/series/'
                                  + this.seriesNo + '/group/' + (this.groupNo + 1));

    } else if (!this.seriesCompleted()) {

      this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/series/'
                                  + (this.seriesNo + 1)  + '/group/1');

    } else {
      this.appService.setNextUrl('soc/' + this.trackerId + '/tower/' + this.towerNo + '/ystrainer');
    }
  }

  groupCompleted() {
    const noOfFloor = (this.flatGrp.to - this.seriesNo) / 100;
    if (noOfFloor === (this.noOfFloors - 1)) {
      return true;
    }
    return false;
  }

  seriesCompleted() {
    const noOfSeriesInTower = this.towerConfig.getNoOfSeries();
    if (this.seriesNo === noOfSeriesInTower) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  addRemoveInlet(addOnlet, isChecked: boolean) {
    const index = this.flatGrp.inletGrp.findIndex(x => x.inlet.toLowerCase() === addOnlet.toLowerCase());
    const chooseArrIndex = this.chooseInletArray.indexOf(addOnlet.toUpperCase());
    const selfIndex = this.typeOfInlet.findIndex(x => x.inlet.toLowerCase() === addOnlet.toLowerCase());
    if (isChecked) {
      if (index === -1) {
        this.flatGrp.inletGrp.push({ inlet: addOnlet.toUpperCase(), type: 'cold', meter: 'DN-15' });
        this.selectedInlet.push(addOnlet.toUpperCase());
      }
      if (chooseArrIndex === -1) {
        this.chooseInletArray.push(addOnlet.toUpperCase());
      }
    }
    this.typeOfInlet.splice(selfIndex, 1);
  }

  combineInlet() {
    const cInlet = this.firstInlet + this.combineType + this.secondInlet;
    const index = this.flatGrp.inletGrp.findIndex(x => x.inlet.toLowerCase() === cInlet.toLowerCase());
    if (index === -1) {
      this.flatGrp.inletGrp.push({ inlet: cInlet, type: 'cold', meter: 'DN-15' });
      this.removeCombineInletArr(this.firstInlet);
      this.removeCombineInletArr(this.secondInlet);
      this.removeInlet(this.firstInlet);
      this.removeInlet(this.secondInlet);
    }
    console.log(this.selectedInlet);
  }

  removeCombineInletArr(inlet: string) {
    const index = this.chooseInletArray.indexOf(inlet);
    if (index > -1) {
      this.chooseInletArray.splice(index, 1);
    }
    if (this.chooseInletArray.length <= 1) {
      this.showCombineBox = false;
    }
  }

  removeInlet(inlet: string) {
    const index = this.flatGrp.inletGrp.findIndex(x => x.inlet.toLowerCase() === inlet.toLowerCase());
    if (index > -1) {
      this.flatGrp.inletGrp.splice(index, 1);
    }
  }

  removeInletDir(rInlet: string) {
    const index = this.flatGrp.inletGrp.findIndex(x => x.inlet.toLowerCase() === rInlet.toLowerCase());
    let inletArr = [];
    if (index > -1) {

      if (rInlet.indexOf('&') > -1) {
        inletArr = rInlet.split('&');
      } else if (rInlet.indexOf('+') > -1) {
        inletArr = rInlet.split('+');
      }

      if (inletArr.length > 1) {
        // for first inlet
        this.removeCombineInletArr(inletArr[0]);
        const firstSelectIndex = this.selectedInlet.indexOf(inletArr[0]);
        if (index > -1) {
          this.selectedInlet.splice(firstSelectIndex, 1);
        }
        this.newInletAdded = inletArr[0];
        this.addNewInlet();
        
        // for second inlet
        this.removeCombineInletArr(inletArr[1]);
        const secondSelectIndex = this.selectedInlet.indexOf(inletArr[1]);
        if (index > -1) {
          this.selectedInlet.splice(secondSelectIndex, 1);
        }
        this.newInletAdded = inletArr[1];
        this.addNewInlet();
        
      } else {
        this.removeCombineInletArr(rInlet); 
        const secondSelectIndex = this.selectedInlet.indexOf(rInlet);
        if (index > -1) {
          this.selectedInlet.splice(secondSelectIndex, 1);
        }
        this.newInletAdded = rInlet;
        this.addNewInlet();
      }
      this.flatGrp.inletGrp.splice(index, 1);
    }
  }

  addNewInlet() {
    const index = this.typeOfInlet.findIndex(x => x.inlet.toLowerCase() === this.newInletAdded.toLowerCase());
    const selectedIndex = this.selectedInlet.indexOf(this.newInletAdded.toUpperCase());
    if (index === -1 && selectedIndex === -1) {
      this.typeOfInlet.push({ inlet: this.newInletAdded.toUpperCase() });
      this.newInletAdded = '';
    } else {
      alert('Inlet is already there, please have take a look');
    }
  }

}

