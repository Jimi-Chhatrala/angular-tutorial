import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  // Action stream
  private actions$ = inject(Actions);

  // API service
  private userService = inject(UserService);

  // Effect to load users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
