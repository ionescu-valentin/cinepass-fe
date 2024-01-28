import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private readonly moviesApiUrl = 'movies';

  constructor(private apiService: ApiService) { }

  getMovies(): Observable<any> {
    return this.apiService.get(`${this.moviesApiUrl}`);
  }

  getMovieById(id: string, timeId?: number): Observable<any> {
    const params = { id };
    if (timeId) params['timeId'] = timeId;
    return this.apiService.get(`${this.moviesApiUrl}/details`, params);
  }

  reserveSeats(seats: number[], timeId: number): Observable<any> {
    return this.apiService.post(`${this.moviesApiUrl}/reserve`, { seats, timeId });
  }
}
