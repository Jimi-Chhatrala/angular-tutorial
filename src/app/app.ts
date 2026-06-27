import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  items = ['NODEJS', 'JAVASCRIPT', 'TYPESCRIPT', 'MONGODB', 'POSTGRESQL', 'REDIS'];

  numbers = [1, 2, 3, 4, 5, 0, 9, 8, 7, 6, 5];
}
