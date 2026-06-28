import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  firstName: string = 'john';
  lastName: string = 'doe';
  fullName: string = this.firstName + ' ' + this.lastName;

  todayDate = new Date();

  amount = 34500;

  percentage = 0.35;

  userData = {
    name: this.firstName + ' ' + this.lastName,
    age: 25,
  };
}
