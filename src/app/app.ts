import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial signal');
  name: string = 'Angular Tutorial';
  isAdmin: boolean = true;
  count: number = 5
  price: number = 199.99;
  isLogin: boolean = true;

  getUser() {
    return 'Enjoy Angular Tutorial';
  }
}
