import { Component, signal } from '@angular/core';
import { FormField } from './form-field/form-field';

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  email = '';

  onEmailChange(value: string) {
    console.log('onEmailChange value: ', value);
    this.email = value;
  }
}
