import { Component, signal } from '@angular/core';
import { UsersComp } from './components/users-comp/users-comp';

@Component({
  selector: 'app-root',
  imports: [UsersComp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
