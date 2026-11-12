import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { formFeature } from './form/form.feature';
import { CommonModule } from '@angular/common';
import { resetForm, updateFormField } from './form/form.actions';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Way 1
  // form$: Observable<{ name: string; email: string }>;

  // constructor(private store: Store) {
  //   this.form$ = this.store.select(formFeature.selectFormState);
  // }

  // Way 2
  private store = inject(Store);

  form$ = this.store.select(formFeature.selectFormState);

  updatedField(field: 'name' | 'email', value: string) {
    this.store.dispatch(updateFormField({ field, value }));
  }

  resetForm() {
    this.store.dispatch(resetForm());
  }
}
