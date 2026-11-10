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

  // Way 1 ----------------------------------------------------------
  // userService = inject(UserService);

  // users = toSignal<User[]>(this.userService.getUsers());

  // Way 2 ----------------------------------------------------------
  // users: User[] = [];

  // constructor(private userService: UserService) {}

  // ngOnInit() {
  //   this.userService.getUsers().subscribe((data) => {
  //     this.users = data;
  //   })
  // }

  // Way 3 ----------------------------------------------------------
  users = signal<User[]>([]);
  name = signal<string>('');
  email = signal<string>('');

  editingUpdateID = signal<number | null>(null);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); // Load users on component init
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users.set(data);
    });
  }

  // Clicked Edit
  editUser(user: User) {
    this.editingUpdateID.set(user.id!);
    this.name.set(user.name);
    this.email.set(user.email);
  }

  submitForm() {
    const payload: User = {
      name: this.name(),
      email: this.email(),
      isActive: false,
    };

    // Update user
    if (this.editingUpdateID() !== null) {
      this.userService.updateUser(this.editingUpdateID()!, payload).subscribe(() => {
        alert('User updated successfully.');
        this.afterSave();
      });
    } else {
      this.userService.addUser(payload).subscribe(() => {
        alert('User added successfully.');
        this.afterSave();
      });
    }
  }

  toggleStatus(user: User) {
    this.userService.updateUserStatus(user.id!, !user.isActive).subscribe(() => {
      this.users.update((list) =>
        list.map((list_user) =>
          list_user.id === user.id ? { ...list_user, isActive: !list_user.isActive } : list_user,
        ),
      );
    });
  }

  afterSave() {
    this.loadUsers(); // Refresh the user list after adding a new user
    this.name.set('');
    this.email.set('');
    this.editingUpdateID.set(null);
  }
}
