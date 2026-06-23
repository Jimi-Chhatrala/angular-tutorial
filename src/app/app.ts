import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  // Way 1
  // templateUrl: './app.html',
  // styleUrl: './app.scss',

  // Way 2
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './buttons.scss'],

  // Way 3
  // template: `<h2 class="inline-html">Inline HTML</h2>`,
  // styles: [
  //   `
  //     .inline-html {
  //       font-size: 50px;
  //       color: orangered
  //     }
  //   `,
  // ],
})
export class App {
  protected readonly title = signal('angular-tutorial');
}
