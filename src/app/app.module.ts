import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SocietyDetailsComponent } from './society-details/society-details.component';
import { StepNavComponent } from './step-nav/step-nav.component';
import { MeterByFloorComponent } from './meter-by-floor/meter-by-floor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    SocietyDetailsComponent,
    StepNavComponent,
    MeterByFloorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
