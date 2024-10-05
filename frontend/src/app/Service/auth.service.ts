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

   // Registrar un nuevo usuario
   register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Loguearse y obtener el token
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

  // Setear el token en el localstorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Borrar el token 
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Chequea si esta autenticado con el token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
