import { createSelector } from '@ngrx/store';

export interface AppState {
  counter: number;
}

export const selectCounterState = (state: AppState) => state.counter;

export const selectCounter = createSelector(selectCounterState, (counter) => counter);
