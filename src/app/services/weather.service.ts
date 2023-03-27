import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, firstValueFrom } from 'rxjs';
import { SimpleWeather } from '../models/models';

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const APPID = "1ae78dc134dcba49bf27bd3219b15074"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  onWeather = new Subject<SimpleWeather>

  constructor(private http: HttpClient) { }

  getWeatherAsObservable(city: string): Observable<SimpleWeather[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', APPID)

    return this.http.get<SimpleWeather[]>(WEATHER_URL, { params })
      .pipe()
  }

  getWeather(city: string): Promise<SimpleWeather> {
    return firstValueFrom(
      this.getWeatherAsObservable(city)
    )
      .then((data: any) => {
        // map() and tap()
        const w = data['weather'] as SimpleWeather[]
        //this.onWeather.next(w)
        return w
      })
      .then(data => {
        // this.onWeather.next(data[0])
        // console.debug("SERVICE >",data[0])
        return data[0]
      })
  }

}
