import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Example 1
  count = signal(0);

  changeCount() {
    this.count.set(20);
  }

  incrementCount() {
    this.count.update((value) => value + 1);
  }

  incrementCountUsingSet() {
    this.count.set(this.count() + 1);
  }

  // Example 2
  user = signal({
    name: 'John',
    age: 25,
  });

  changeUser() {
    this.user.set({
      name: 'David',
      age: 30,
    });
  }

  increaseUserAge() {
    this.user.update((currentUser) => ({
      ...currentUser,
      age: currentUser.age + 1,
    }));
  }
}
