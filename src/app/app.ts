import { Component, signal } from '@angular/core';
import { CounterStore } from './core/store/counter';
import { UserStore } from './core/store/user';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  constructor(
    public counterStore: CounterStore,
    public userStore: UserStore,
  ) {}
}
