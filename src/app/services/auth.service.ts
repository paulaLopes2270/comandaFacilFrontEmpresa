import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';  // Importação do operador tap

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL da API

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Método de login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
      })
    );
  }

  // Método de registro de novo usuário
  register(user: { username: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para obter o papel do usuário a partir do token JWT
  getCurrentUserRole(): Observable<string> {
    const token = this.getToken(); // Assumindo que você já tenha o token armazenado
    if (token) {
      const decoded = this.decodeJWT(token); // Função que decodifica o JWT
      return of(decoded.role); // Retorna o papel do usuário
    }
    return of(''); // Retorna vazio se não houver token
  }

  // Função de utilidade para decodificar o JWT
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Token JWT inválido', e);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    this.removeToken();
    // Redirecionar ou fazer outra lógica de logout
  }

  private storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
