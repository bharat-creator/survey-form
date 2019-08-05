import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import { StepNavComponent } from './step-nav/step-nav.component';
import { MeterByFloorComponent } from './meter-by-floor/meter-by-floor.component';
import { YStrainerComponent } from './y-strainer/y-strainer.component';

import { FormsModule } from '@angular/forms';
import { SocietyDetailsService } from './society-details/society-details.service';
import { TowerConfigComponent } from './tower-config/tower-config.component';
import { TowerConfigService } from './tower-config/tower-config.service';
import { MeterByFloorService } from './meter-by-floor/meter-by-floor.service';
import { PrevNextComponent } from './prev-next/prev-next.component';
import { AppService } from './app-service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    SocietyDetailsComponent,
    StepNavComponent,
    MeterByFloorComponent,
    YStrainerComponent,
    TowerConfigComponent,
    PrevNextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService, SocietyDetailsService, TowerConfigService, MeterByFloorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
