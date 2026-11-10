import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly loginModel = signal({
    email: '',
    password: '',
  });

  protected readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
    required(path.password, { message: 'Password is required.' });
  });

  protected readonly attemptedSubmit = signal(false);
  protected readonly formStatus = signal('');

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    this.attemptedSubmit.set(true);
    this.formStatus.set('');

    if (this.loginForm().invalid()) {
      return;
    }

    this.formStatus.set('Form is valid. Authentication is not connected yet.');
  }
}
