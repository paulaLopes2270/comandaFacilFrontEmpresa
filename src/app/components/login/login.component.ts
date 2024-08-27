import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],  // Adicionar RouterModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Exibe a mensagem de erro ao redirecionar de uma rota protegida
    this.route.queryParams.subscribe(params => {
      if (params['notAuthorized']) {
        this.errorMessage = 'Você precisa estar autenticado para acessar essa página.';
      }
      if (params['loggedOut']) {
        this.errorMessage = 'Você saiu com sucesso.';
      }
    });
  }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/company-list']), // Redireciona após o login
      error: err => this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.' 
    });
  }
}
