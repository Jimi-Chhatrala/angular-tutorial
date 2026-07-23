import { Component, signal } from '@angular/core';
import { Button } from './button/button';

@Component({
  selector: 'app-root',
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  saveData() {
    console.log('saveData Clicked');
  }

  message = '';

  onSave(message: string) {
    console.log(message);
    this.message = message;
  }
}
