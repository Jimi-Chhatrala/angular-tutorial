import { createReducer, on } from '@ngrx/store';
import { resetForm, updateFormField } from './form.actions';

export interface FormState {
  name: string;
  email: string;
}

export const initialState: FormState = {
  name: '',
  email: '',
};

export const reducer = createReducer(
  initialState,

  on(updateFormField, (state, { field, value }) => ({
    ...state,
    [field]: value,
  })),

  on(resetForm, () => initialState),
);
