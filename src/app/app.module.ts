import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './Weather.service';

const appRoutes: Routes = [
  { path: '', component: CitiesComponent},
  { path: 'weather/:city', component: WeatherComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }