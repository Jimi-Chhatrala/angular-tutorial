import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './counter.action';

// Initial Stage
export const initialState = 0;

// Creating Reducer Function
export const reducer = createReducer(
  initialState,

  // On Increment Action
  on(increment, (state) => state + 1),

  // On Decrement Action
  on(decrement, (state) => state - 1),

  // On Reset Action
  on(reset, () => initialState),
);
