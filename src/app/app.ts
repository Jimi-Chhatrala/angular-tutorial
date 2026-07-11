import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  count = signal(0);

  isLoggedIn = signal(false);

  items = signal<string[]>(['Angular', 'React', 'Vue']);

  addItem(feLibrary: string) {
    this.items.update((items) => [...items, feLibrary]);
  }

  role = signal<'admin' | 'user'>('user');

  features = signal<string[]>(['Dashboard', 'Profile', 'Settings']);

  makeAdmin() {
    this.role.set('admin');
    this.features.set(['Dashboard', 'Profile', 'Admin Panel', 'User Management']);
  }

  makeUser() {
    this.role.set('user');
    this.features.set(['Dashboard', 'Profile', 'Settings']);
  }
}
