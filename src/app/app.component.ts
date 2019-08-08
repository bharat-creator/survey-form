import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'survey-form';
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    // router.events.subscribe(val => {
    //   if (location.path() !== '') {
    //     this.route = location.path();
    //     console.log('ruote' + this.route);
    //   } else {
    //     this.route = 'Home';
    //   }
    // });

  }

}
