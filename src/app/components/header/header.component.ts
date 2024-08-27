import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // Executa o logout
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }
}
