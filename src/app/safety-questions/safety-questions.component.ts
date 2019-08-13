import { AppService } from './../app-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safety-questions',
  templateUrl: './safety-questions.component.html',
  styleUrls: ['./safety-questions.component.css']
})
export class SafetyQuestionsComponent implements OnInit {
  trackerId: number;
  rowOfQues = [{question: 'How many ducts have water/sewage leaks?', noOfDucts: 0}];
  safetyconcern: string;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.trackerId = this.appService.getTrackerId();

    this.appService.setPrevUrl('/soc/' + this.trackerId + '/common');
    this.appService.setNextUrl('soc/' + this.trackerId + '/customerinput');
  }


}
