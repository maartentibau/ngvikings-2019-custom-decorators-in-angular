import { Component } from '@angular/core';
import { validateCountry, isViking } from './validateViking';

const VIKING_COUNTRIES = [
  'Finland',
  'Sweden',
  'Norway',
  'Iceland'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  viking: {
    firstName: string,
    lastName: string,
    placeOfBirth: string,
    yearOfBirth: number;
  };

  constructor() {
  }

  buttonClick(firstName: string, lastName: string, placeOfBirth: string, yearOfBirth: number) {
    this.viking = this.generateViking(firstName, lastName, placeOfBirth, yearOfBirth)
  }

  @isViking(VIKING_COUNTRIES)
  generateViking(firstName: string, lastName: string, @validateCountry placeOfBirth: string, yearOfBirth: number) {
    return {
      firstName,
      lastName,
      placeOfBirth,
      yearOfBirth
    }
  }
}
