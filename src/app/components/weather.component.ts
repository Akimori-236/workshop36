import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../Weather.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  weatherSub!: Subscription
  currentWeather!: Weather[]
  selectedCity!: string

  constructor(
    // private weatherSvc: WeatherService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {
    // subscribe to weather service
    // this.weatherSub = this.weatherSvc.onWeather.subscribe(
    //   (response) => { this.currentWeather = response }
    // )
    // get the route parameter / @PathVariable
    this.selectedCity = this.activatedRoute.snapshot.params['city'];
    this.title.setTitle(`Weather for ${this.selectedCity}`)
    console.debug("CITY > " + this.selectedCity)
  }

  ngOnDestroy(): void {
    // this.weatherSub.unsubscribe();
  }

  // trigger weather service

}
