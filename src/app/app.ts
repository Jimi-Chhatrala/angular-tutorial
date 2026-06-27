import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  signalValue = signal(0);
  normalValue = 20;

  increment() {
    this.signalValue.update((value) => value + 1);
  }

  decrement() {
    this.signalValue.update((value) => value - 1);
  }

  reset() {
    this.signalValue.set(0);
  }
}
