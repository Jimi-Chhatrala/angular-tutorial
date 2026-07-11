import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  count = signal(0);
  name = signal('Angular');

  setCount() {
    this.count.set(2);
  }

  count1 = signal(2);
  doubleCount = computed(() => this.count1() * 2);

  constructor() {
    effect(() => {
      console.log('Double Count:', this.doubleCount());
    });
    effect(() => {
      console.log('Total Price Unit', this.total());
    });
  }

  increment() {
    this.count1.update((c) => c + 1);
  }

  unit = signal(2);
  price = signal(5);

  total = computed(() => this.unit() * this.price());

  updateUnit() {
    this.unit.update((u) => u + 1);
  }

  updatePrice() {
    this.price.update((p) => p + 1);
  }
}
