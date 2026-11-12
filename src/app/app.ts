import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/counter.action';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState, selectCounter } from './store/counter.selectors';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  counter$!: Observable<number>;
  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select(selectCounter);
  }

  incrementCount() {
    this.store.dispatch(increment());
  }

  decrementCount() {
    this.store.dispatch(decrement());
  }

  resetCount() {
    this.store.dispatch(reset());
  }
}
