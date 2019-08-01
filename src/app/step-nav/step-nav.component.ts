import { AppComponent } from './../app.component';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-step-nav',
  templateUrl: './step-nav.component.html',
  styleUrls: ['./step-nav.component.css']
})
export class StepNavComponent implements OnInit {

  constructor(@Inject(AppComponent) private parent: AppComponent) { }

  ngOnInit() {
    console.log(this.parent.stepcss);
  }

}
