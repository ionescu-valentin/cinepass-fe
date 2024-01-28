import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl;

  // prettier-ignore
  constructor(
    private http: HttpClient,
  ) {
    // this.apiUrl = 'http://www.omdbapi.com/';
    this.apiUrl = 'http://127.0.0.1:3005/api/v1/';
  }

  get(path: string, params = {}, headers = {}) {
    return this.http.get(`${this.apiUrl}${path}`, { params, headers });
  }

  put(path: string, body = {}, params = {}, headers = {}) {
    return this.http.put(`${this.apiUrl}${path}`, body, { params, headers });
  }

  post(path: string, body = {}, params = {}, headers = {}) {
    return this.http.post(`${this.apiUrl}${path}`, body, { params, headers });
  }

  delete(path: string, params = {}) {
    return this.http.delete(`${this.apiUrl}${path}`, { params });
  }
}
