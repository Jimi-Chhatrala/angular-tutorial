import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  count = signal(0);

  isDarkMode = signal(false);

  message = signal('');

  constructor() {
    effect(() => {
      console.log(`Count value:`, this.count());
    });

    effect(() => {
      if (this.isDarkMode()) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      }
    });

    effect(() => {
      if (this.message()) {
        setTimeout(() => {
          this.message.set('');
        }, 3000);
      }
    });
  }

  showMessage() {
    this.message.set('Setting this message on button click.');
  }

  toggle() {
    this.isDarkMode.update((mode) => !mode);
  }

  increment() {
    this.count.update((c) => c + 1);
  }
}
