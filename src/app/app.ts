import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
  status: string = 'shipped';

  age: number = 60;

  updateAge(val: string) {
    this.age = Number(val);
  }

  section = 'home';
}
