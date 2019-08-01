import { Component, OnInit } from '@angular/core';
import { SeriesGrp, FlatGrp, InletGrp } from './series-group';

@Component({
  selector: 'app-meter-by-floor',
  templateUrl: './meter-by-floor.component.html',
  styleUrls: ['./meter-by-floor.component.css']
})
export class MeterByFloorComponent implements OnInit {
  flatGrp: FlatGrp;
  typeOfFlat = ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa'];

  constructor() { }

  ngOnInit() {
    this.flatGrp = {
      from: '001',
      to: '301',
      flatType: '2BHK',
      jointSeries: 0,
      jointFlat: '',
      inletGrp: [
        { inlet: 'K', type: 'Cold', meter: 'DN-15' },
        { inlet: 'M', type: 'Cold', meter: 'DN-15' },
        { inlet: 'B1+B2', type: 'Cold', meter: 'DN-15' }
      ]
    };
  }

}
