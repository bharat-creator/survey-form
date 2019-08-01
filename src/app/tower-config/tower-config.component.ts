import { TowerConfigService } from './tower-config.service';
import { Component, OnInit } from '@angular/core';
import { TowerConfig, PlumbingStructure } from './tower-config';

@Component({
  selector: 'app-tower-config',
  templateUrl: './tower-config.component.html',
  styleUrls: ['./tower-config.component.css']
})

export class TowerConfigComponent implements OnInit {
  towerConfig: TowerConfig;
  listOfPipeTypes = [{ type: 'cpvc' }, { type: 'upvc' }];
  listOfMaterialSize = [{ size: '1"' }, { size: '2"' }, { size: '3/4"' }];
  constructor(private towerConfigService: TowerConfigService) { }

  ngOnInit() {
    this.towerConfig = this.towerConfigService.getTowerDetail();
    console.log(this.towerConfig);
  }

}
