import { Component, inject, signal } from '@angular/core';
import { UserService } from './services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  userService = inject(UserService);

  users:any = toSignal(this.userService.getUsers());
}
