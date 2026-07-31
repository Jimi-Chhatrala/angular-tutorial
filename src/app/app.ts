import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComp } from './header-comp/header-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
