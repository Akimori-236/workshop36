import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  newCityForm!: FormGroup
  cityList: string[] = []

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCityForm = this.fb.group({
      newCity: this.fb.control<string>('', [Validators.required]),
    })
    // retrieve from localStorage?
    let lsList = localStorage.getItem('cityList')
    if (!!lsList) {
      this.cityList = JSON.parse(lsList)
    } else {
      // init new list
      this.cityList = ["singapore", "tokyo", "melbourne"]
      localStorage.setItem('cityList', JSON.stringify(this.cityList))
    }
  }

  addCity() {
    // get value from form
    const cityCtrl: FormControl = this.newCityForm.get('newCity') as FormControl
    const newcityValue: string = cityCtrl.value.toLowerCase()
    if (!this.cityList.includes(newcityValue)) {
      this.cityList.push(newcityValue)
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
