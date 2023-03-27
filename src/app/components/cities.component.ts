import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { City } from '../models/models';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  newCityForm!: FormGroup
  cityList: City[] = []

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCityForm = this.fb.group({
      newCity: this.fb.control<string>('', [Validators.required]),
      newCountryCode: this.fb.control<string>('', [Validators.required, Validators.maxLength(2)]),
    })
    // retrieve from localStorage?
    let lsList = localStorage.getItem('cityList')
    if (!!lsList) {
      this.cityList = JSON.parse(lsList)
      this.cityList.sort()
    } else {
      // init new list
      this.cityList = [
        { name: "singapore", countryCode: "sg" },
        { name: "tokyo", countryCode: "jp" },
        { name: "melbourne", countryCode: "au" }
      ]
      this.cityList.sort()
      localStorage.setItem('cityList', JSON.stringify(this.cityList))
    }
  }

  addCity() {
    // get value from form
    const cityCtrl: FormControl = this.newCityForm.get('newCity') as FormControl
    const countryCtrl: FormControl = this.newCityForm.get('newCountryCode') as FormControl
    const newcityValue: string = cityCtrl.value.toLowerCase()
    const newcountryValue: string = countryCtrl.value.toLowerCase()
    const newEntry = { name: newcityValue, countryCode: newcountryValue }
    if (!this.cityList.includes(newEntry)) {
      this.cityList.push(newEntry)
      this.cityList.sort()
    }
    // save to localStorage?
    localStorage.setItem('cityList', JSON.stringify(this.cityList))
  }

  deleteCity(index: number) {
    this.cityList.splice(index, 1)
    // save to localStorage?
    localStorage.setItem('cityList', JSON.stringify(this.cityList))
  }
}
