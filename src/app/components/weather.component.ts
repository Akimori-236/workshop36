import { Component, OnInit } from '@angular/core';
import { SimpleWeather } from '../models/models';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  currentWeather!: SimpleWeather
  selectedCity!: string

  constructor(
    private weatherSvc: WeatherService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {
    // get the route parameter / @PathVariable
    this.selectedCity = this.toTitleCase(this.activatedRoute.snapshot.params['city']);
    // ANOTHER WAY TO GET PARAM
    // this.param$ = this.activatedRoute.params.subscribe(
    //   (params) => {
    //     this.selectedCity = params['city']
    //   }
    // )
    this.title.setTitle(`Weather for ${this.selectedCity}`)
    console.debug("CITY > " + this.selectedCity)

    // get weather promise from service
    this.weatherSvc.getSimpleWeather(this.selectedCity)
      .then((response) => { this.currentWeather = response })
  }

  toTitleCase(str: string): string {
    let strArr = str.toLowerCase().split(' ');
    for (var i = 0; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }
}

