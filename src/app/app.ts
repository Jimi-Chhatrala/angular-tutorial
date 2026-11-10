import { Component, inject, signal } from '@angular/core';
import { UsersService } from './services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  private readonly userService = inject(UsersService);
  protected readonly users = toSignal(this.userService.getUsers(), { initialValue: [] });
}
