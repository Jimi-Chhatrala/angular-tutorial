import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Review {
  id: number;
  name: string;
  job: string;
  image: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private httpClient: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.apiUrl);
  }
}
