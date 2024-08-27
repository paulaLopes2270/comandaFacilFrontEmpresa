import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register-company/register.component";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, HeaderComponent, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'comandaFacilEmpresa';

  constructor(public router: Router) {}

  shouldShowHeader(): boolean {
    // Verifica se a rota atual é '/login' ou '/register-user-company'
    return this.router.url !== '/login' && this.router.url !== '/register-user';
  }
}
