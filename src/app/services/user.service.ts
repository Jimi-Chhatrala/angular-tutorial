import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Add a user
  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  // Update an existing user (PUT request API)
  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${id}`, user);
  }
}
