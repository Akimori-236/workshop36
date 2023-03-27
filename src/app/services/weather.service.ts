import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { SimpleWeather } from '../models/models';
import { environment } from 'src/environments/environment.development';

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
      .set('appid', environment.ApiKey)

    return this.http.get<SimpleWeather[]>(environment.OpenWeatherApiUrl, { params })
      .pipe()
  }

  getSimpleWeather(city: string): Promise<SimpleWeather> {
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

  getWeather(city: string) {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', environment.ApiKey)

    return lastValueFrom(this.http.get(environment.OpenWeatherApiUrl, { params: params }))
  }
}