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
    // LOADING FROM LOCALSTORAGE
    let lsList = localStorage.getItem('cityList')
    if (!!lsList) {
      this.cityList = JSON.parse(lsList)
      this.cityList.sort((a, b) => (a.name > b.name) ? 1 : -1)
    } else {
      // INITIALISE COUNTRY LIST
      this.cityList = [
        { name: "singapore", countryCode: "sg" },
        { name: "tokyo", countryCode: "jp" },
        { name: "melbourne", countryCode: "au" }
      ]
      this.cityList.sort((a, b) => (a.name > b.name) ? 1 : -1)
      localStorage.setItem('cityList', JSON.stringify(this.cityList))
    }
  }

  addCity() {
    // GET VALUES FROM FORM
    const cityCtrl: FormControl = this.newCityForm.get('newCity') as FormControl
    const countryCtrl: FormControl = this.newCityForm.get('newCountryCode') as FormControl
    const newcityValue: string = cityCtrl.value.toLowerCase().trim()
    const newcountryValue: string = countryCtrl.value.toLowerCase().trim()
    const newEntry = { name: newcityValue, countryCode: newcountryValue }
    // CHECK IF ENTRY EXISTS
    if (!this.cityList.includes(newEntry)) {
      this.cityList.push(newEntry)
      this.cityList.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('cityList', JSON.stringify(this.cityList))
  }

  deleteCity(index: number) {
    this.cityList.splice(index, 1)
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('cityList', JSON.stringify(this.cityList))
  }
}
