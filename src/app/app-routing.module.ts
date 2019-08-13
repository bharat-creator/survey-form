import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import { TowerConfigComponent } from './tower-config/tower-config.component';
import { MeterByFloorComponent } from './meter-by-floor/meter-by-floor.component';
import { YStrainerComponent } from './y-strainer/y-strainer.component';
import { ScaffoldingCivilWorkComponent } from './scaffolding-civil-work/scaffolding-civil-work.component';
import { CommonComponent } from './common/common.component';
import { SupplyComponent } from './supply/supply.component';
import { SafetyQuestionsComponent } from './safety-questions/safety-questions.component';
import { CustomerInputComponent } from './customer-input/customer-input.component';
import { PreviewComponent } from './preview/preview.component';


const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'soc/:trackerId/detail', component: SocietyDetailsComponent },
  { path: 'soc/:trackerId/tower/:towerNo/config', component: TowerConfigComponent },
  { path: 'soc/:trackerId/tower/:towerNo/series/:seriesNo/group/:groupNo', component: MeterByFloorComponent },
  { path: 'soc/:trackerId/tower/:towerNo/ystrainer', component: YStrainerComponent },
  { path: 'soc/:trackerId/tower/:towerNo/scaffolding&civil', component: ScaffoldingCivilWorkComponent },
  { path: 'soc/:trackerId/common', component: CommonComponent },
  { path: 'soc/:trackerId/supply', component: SupplyComponent },
  { path: 'soc/:trackerId/safetyquestions', component: SafetyQuestionsComponent},
  { path: 'soc/:trackerId/customerinput', component: CustomerInputComponent},
  { path: 'soc/:trackerId/preview', component: PreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
