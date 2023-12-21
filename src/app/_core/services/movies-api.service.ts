import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(private apiService: ApiService) { }

  getMovies(): Observable<any> {
    return this.apiService.get(``, { s: 'batman', apikey: 'bdb079da' });
  }

  getMovieById(id: string): Observable<any> {
    return this.apiService.get(``, { i: id, apikey: 'bdb079da' });
  }
}
