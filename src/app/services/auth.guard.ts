import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Redireciona para login com o parâmetro de query notAuthorized
      this.router.navigate(['/login'], { queryParams: { notAuthorized: true } });
      return false;
    }
  }
}
