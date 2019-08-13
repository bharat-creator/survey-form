import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.css']
})
export class CustomerInputComponent implements OnInit {
  trackerId: number;
  customerinput: string;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();

    this.appService.setPrevUrl('/soc/' + this.trackerId + '/safetyquestions');
    this.appService.setNextUrl('soc/' + this.trackerId + '/preview');
  }

}
