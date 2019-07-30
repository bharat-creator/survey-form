import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import { MeterByFloorComponent } from './meter-by-floor/meter-by-floor.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'socdetail/:socid', component: SocietyDetailsComponent },
  { path: 'tower', component: MeterByFloorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
