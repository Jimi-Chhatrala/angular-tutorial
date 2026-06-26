import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
  isLoggedIn = false;

  age = 18;
  updatedAge(val: string) {
    this.age = Number(val);
  }

  showText = true;
  toggleBox() {
    this.showText = !this.showText;
  }
}
