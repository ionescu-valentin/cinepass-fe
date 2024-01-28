import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private apiService: ApiService) { }

  googleLogin(user: any): Observable<any> {
    return this.apiService.post(`auth/login`, user);
  }

  getMovieById(id: string): Observable<any> {
    return this.apiService.get(``);
  }
}
