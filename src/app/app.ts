import { Component, signal } from '@angular/core';
import { ChildComp } from './components/child-comp/child-comp';

@Component({
  selector: 'app-root',
  imports: [ChildComp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  show = signal(true);

  changeTitle() {
    this.title.set('Title changed.');
  }

  toggle() {
    this.show.set(!this.show());
  }
}
