import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  counter: number = 0;

  handleCounter(counterType: string) {
    if (counterType === 'minus') {
      if (this.counter > 0) this.counter--;
    } else if (counterType === 'plus') {
      this.counter++;
    } else if (counterType === 'reset') {
      this.counter = 0;
    }
  }
}
