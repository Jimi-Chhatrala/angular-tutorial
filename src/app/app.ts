import { Component, signal } from '@angular/core';
import { SigninComponent } from './signin/signin';

@Component({
  selector: 'app-root',
  imports: [SigninComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
