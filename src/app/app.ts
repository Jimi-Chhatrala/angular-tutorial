import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  count = signal<number>(2);

  doubleCount = computed<number>(() => this.count() * 2);
  trippleCount = computed<number>(() => this.count() * 3);

  increment() {
    this.count.set(this.count() + 1);
  }

  firstName = signal<string>('John');
  lastName = signal<string>('Doe');

  fullName = computed<string>(() => `${this.firstName()} ${this.lastName()}`);

  prices = signal<number[]>([1, 2, 3, 4, 5]);

  total = computed<number>(() => {
    return this.prices().reduce((acc, curr) => acc + curr, 0);
  });
}
