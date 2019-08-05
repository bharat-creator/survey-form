import { MeterByFloorService } from './meter-by-floor.service';
import { Component, OnInit } from '@angular/core';
import { SeriesGrp, FlatGrp, InletGrp } from './series-group';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { TowerConfigService } from '../tower-config/tower-config.service';

@Component({
  selector: 'app-meter-by-floor',
  templateUrl: './meter-by-floor.component.html',
  styleUrls: ['./meter-by-floor.component.css']
})
export class MeterByFloorComponent implements OnInit {

  trackerId: number;
  towerNo: number;
  seriesNo: number;
  groupNo: number;
  chooseFlatArray = [];
  newInletAdded: string;
  chooseInletArray = [];
  showCombineBox = false;
  combineType = '&';
  firstInlet = '';
  secondInlet = '';

  flatGrp: FlatGrp;
  typeOfFlat = [{ type: '1BHK' }, { type: '2BHK' }, { type: '3BHK' }, { type: '4BHK' }, { type: 'Villa' }];
  typeOfInlet = [{ inlet: 'K' }, { inlet: 'M' }, { inlet: 'B1' }, { inlet: 'B2' }, { inlet: 'U' }, { inlet: 'S' }];
  selectedInlet = [];
  constructor(private activatedRoute: ActivatedRoute, private parent: AppComponent, private mtrbyflr: MeterByFloorService,
              private towerConfig: TowerConfigService) {

    this.trackerId = this.activatedRoute.snapshot.params.trackerId;
    this.towerNo = this.activatedRoute.snapshot.params.towerNo;
    this.seriesNo = 1;// this.activatedRoute.snapshot.params.seriesNo;
    this.groupNo = this.activatedRoute.snapshot.params.groupNo;

    this.magicalLogicFn();

  }

  magicalLogicFn() {
    const noOfFloors = this.towerConfig.getNoOfFloors();
    this.mtrbyflr.setStartFromVal(1);
    this.mtrbyflr.setEndToVal((noOfFloors - 1) * 100 + this.seriesNo);
    console.log((noOfFloors - 1) * 100 + this.seriesNo);
    for (let i = 1; i <= noOfFloors; i++) {
      this.chooseFlatArray.push((i - 1) * 100 + this.seriesNo);
    }
    console.log(this.chooseFlatArray);
  }

  ngOnInit() {
    this.flatGrp = {
      from: this.mtrbyflr.getStartFromVal(),
      to: this.mtrbyflr.getEndToVal(),
      flatType: '2BHK',
      jointSeries: 0,
      jointFlat: '',
      inletGrp: [

      ]
    };

    console.log('Child Component' + this.parent.stepcss);
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

