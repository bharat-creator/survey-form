import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import { TowerConfigComponent } from './tower-config/tower-config.component';
import { MeterByFloorComponent } from './meter-by-floor/meter-by-floor.component';
import { YStrainerComponent } from './y-strainer/y-strainer.component';
import { ScaffoldingCivilWorkComponent } from './scaffolding-civil-work/scaffolding-civil-work.component';
import { CommonSupplyComponent } from './common-supply/common-supply.component';


const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'soc/:trackerId/detail', component: SocietyDetailsComponent },
  { path: 'soc/:trackerId/tower/:towerNo/config', component: TowerConfigComponent },
  { path: 'soc/:trackerId/tower/:towerNo/series/:seriesNo/group/:groupNo', component: MeterByFloorComponent },
  { path: 'soc/:trackerId/tower/:towerNo/ystrainer', component: YStrainerComponent },
  { path: 'soc/:trackerId/tower/:towerNo/scaffolding&civil', component: ScaffoldingCivilWorkComponent },
  { path: 'soc/:trackerId/common&supply', component: CommonSupplyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
