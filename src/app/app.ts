import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userFeature } from './users/user.feature';
import { loadUsers } from './users/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users$!: Observable<any>;

  constructor(private store: Store) {
    this.users$ = this.store.select(userFeature.selectUserState);
  }

  load() {
    this.store.dispatch(loadUsers());
  }
}
