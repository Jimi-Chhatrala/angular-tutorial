import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComp } from './core/layout/navbar-comp/navbar-comp';
import { SidebarComp } from './core/layout/sidebar-comp/sidebar-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComp, SidebarComp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
