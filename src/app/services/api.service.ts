import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/';
  private cache = new Map<string, any>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log('Token:', token);  // Log do token
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
        console.log('Authorization Header:', headers.get('Authorization'));  // Log do cabeçalho Authorization
      }
    }
    return headers;
  }

  private handleError(error: any): Observable<never> {
    let errorMsg = 'Ocorreu um erro; por favor, tente novamente mais tarde.';
    if (error.status === 401) {
      errorMsg = 'Não autorizado. Verifique suas credenciais.';
    } else if (error.status === 404) {
      errorMsg = 'Recurso não encontrado.';
    } else if (error.status === 500) {
      errorMsg = 'Erro interno no servidor.';
    }
    return throwError(() => new Error(errorMsg));
  }

  get<T>(endpoint: string, forceRefresh: boolean = false): Observable<T> {
    if (!forceRefresh && this.cache.has(endpoint)) {
      return of(this.cache.get(endpoint));
    }
    const headers = this.getAuthHeaders();
    return this.http.get<T>(this.baseUrl + endpoint, { headers }).pipe(
      tap(data => this.cache.set(endpoint, data)),
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.post<T>(this.baseUrl + endpoint, data, { headers }).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.put<T>(this.baseUrl + endpoint, data, { headers }).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.delete<T>(this.baseUrl + endpoint, { headers }).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError)
    );
  }

  clearCache(): void {
    this.cache.clear();
  }
}
