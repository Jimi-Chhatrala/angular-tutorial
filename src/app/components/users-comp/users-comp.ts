import { Component, OnInit, inject, signal } from '@angular/core';
import { User, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-comp',
  imports: [],
  templateUrl: './users-comp.html',
  styleUrl: './users-comp.scss',
})
export class UsersComp implements OnInit {
  protected readonly users = signal<User[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');

  private readonly usersService = inject(UsersService);

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load users. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
