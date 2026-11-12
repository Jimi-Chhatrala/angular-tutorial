import { createAction, props } from '@ngrx/store';

export const updateFormField = createAction(
  '[Form] Update Field',
  props<{ field: 'name' | 'email'; value: string }>(),
);

export const resetForm = createAction('[Form] Reset');
