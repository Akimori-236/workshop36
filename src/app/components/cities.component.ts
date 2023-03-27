import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  newCityForm!: FormGroup
  cityList: string[] = ["singapore", "tokyo", "melbourne"]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCityForm = this.fb.group({
      newCity: this.fb.control<string>('', [Validators.required]),
    })
  }

  addCity() {
    // get value from form
    const cityCtrl: FormControl = this.newCityForm.get('newCity') as FormControl
    const newcityValue: string = cityCtrl.value.toLowerCase()
    if (!this.cityList.includes(newcityValue)) {
      this.cityList.push(newcityValue)
    }
  }

  deleteCity(index: number) {
    this.cityList.splice(index, 1)
  }
}
