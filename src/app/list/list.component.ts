import { ListService } from './list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListOfSurvey } from './list';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listOfSurvey: ListOfSurvey;
  constructor(private router: Router, private listService: ListService) { }

  ngOnInit() {
    this.listOfSurvey = {
      toDos: [],
      upComing: [],
      continue: [],
      completed: []
    };

    this.listService.getListOfSurvey().subscribe(list => {
      this.listOfSurvey = list;
    }, (error) => {
      console.log(error);
    });
  }

  startSurvey(socId: number) {
    this.router.navigate(['/soc', socId, 'detail']);
  }

}
