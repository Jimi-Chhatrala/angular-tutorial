import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  name = signal('');
  email = signal('');

  submitForm() {
    console.log(`Name: ${this.name()}, Email: ${this.email()}`);
  }

  userSignal = signal({ name: '', email: '' });

  form: any;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
    });

    this.form.valueChanges.subscribe((value: any) => {
      this.userSignal.set(value);
    });
  }

  submitFormData() {
    console.log(`submitFormData => Name: ${this.name()}, Email: ${this.email()}`);
  }
}
