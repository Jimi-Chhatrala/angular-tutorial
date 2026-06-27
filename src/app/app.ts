import { Component, signal } from '@angular/core';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  count = signal<number>(0);
  name = signal<string>('Angular');
  isAdmin = signal<boolean>(true);
  numbers = signal<number[]>([1, 2, 3, 4, 5]);
  // userData = signal<{ name: string; age: number }>({ name: 'Abc', age: 24 });
  userData = signal<User>({ name: 'Abc', age: 24 });

  override() {
    this.count.set(5);
    this.name.set('Tutorial');
    this.isAdmin.set(false);
    this.numbers.set([5, 6, 7, 8, 9, 0]);
    this.userData.set({ name: 'Xyz', age: 100 });
  }

  update() {
    this.count.update((num) => num + 1);
    this.name.update((str) => str + '.');
    this.isAdmin.update((change) => !change);
    this.numbers.update((nums) => [...nums, 400]);
    this.userData.update((user) => ({ ...user, name: 'Hello, ' + user.name, age: user.age + 1 }));
  }
}
