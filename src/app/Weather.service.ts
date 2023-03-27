import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, Subject, tap } from "rxjs";
import { Weather } from "./models/models";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const APPID = "1ae78dc134dcba49bf27bd3219b15074"

@Injectable()
export class WeatherService {

  onWeather = new Subject<Weather>

  constructor(private http: HttpClient) { }

  getWeatherAsObservable(city: string): Observable<Weather[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', APPID)

    return this.http.get<Weather[]>(WEATHER_URL, { params })
      .pipe()
  }

  getWeather(city: string): Promise<Weather> {
    return firstValueFrom(
      this.getWeatherAsObservable(city)
    )
      .then((data: any) => {
        // map() and tap()
        const w = data['weather'] as Weather[]
        //this.onWeather.next(w)
        return w
      })
      .then(data => {
        this.onWeather.next(data[0])
        console.debug("SERVICE >",data[0])
        return data[0]
      })
  }

}
