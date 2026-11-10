import { Component, inject, signal } from '@angular/core';
import { UserService } from './services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  userService = inject(UserService);

  users = toSignal<User[]>(this.userService.getUsers());
}
