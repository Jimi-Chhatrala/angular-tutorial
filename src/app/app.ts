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

  webCodingList: string[] = ['HTML', 'SCSS', 'JAVASCRIPT', 'NODEJS'];

  users: User[] = [
    { name: 'Abc', age: 18 },
    { name: 'Def', age: 34 },
    { name: 'Ghi', age: 15 },
    { name: 'Jkl', age: 25 },
  ];

  fruits = ['Apple', 'Banana', 'Chiku', 'Dates'];

  removeFruit(index: number) {
    this.fruits.splice(index, 1);
  }

  numbers = [1, 2, 3, 4, 5, 0, 9, 8, 7, 6];
}
