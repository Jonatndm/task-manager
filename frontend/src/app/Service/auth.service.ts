import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) { }

   // Register a new user
   register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Login and get the JWT token
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.token); // Guardar el token JWT en localStorage
          return response;
        }),
        catchError(error => {
          //console.error('Error during login', error);
          return of(null);
        })
      );
  }

  // Store the token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove the token (logout)
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Aquí podrías realizar más validaciones del token si es necesario (expiración, formato)
    return !!token;
  }

}
