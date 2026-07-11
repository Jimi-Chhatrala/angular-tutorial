import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  name: string = 'John';

  username = signal('Hello');

  userData = signal<{ name: string; age: number }>({
    name: 'World',
    age: 25,
  });

  updateName(value: string) {
    this.userData.update((user) => ({ ...user, name: value }));
  }

  updateAge(increaseBy: string | number) {
    this.userData.update((user) => ({ ...user, age: user.age + Number(increaseBy) }));
  }
}
