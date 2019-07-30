import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-society-details',
  templateUrl: './society-details.component.html',
  styleUrls: ['./society-details.component.css']
})
export class SocietyDetailsComponent implements OnInit {
  
  userId: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('socid'));
  }

}
