import { Component, signal } from '@angular/core';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  imports: [Child],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
  username: string = 'Angular';

  message: string = '';

  onMessage(msg: string) {
    this.message = msg;
  }
}
