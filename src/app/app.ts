import { Component, signal } from '@angular/core';
import { Events } from './events/events';

@Component({
  selector: 'app-root',
  imports: [Events],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
