import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
  value: string = 'home';

  tab: string = 'home';

  category: string = '';

  updateCategory(value: string) {
    this.category = value.toLowerCase();
  }
}
