import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  isLoading: boolean = true; // Adiciona variável para controlar o estado de carregamento

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private authService: AuthService // Injeta o AuthService
  ) {}

  ngOnInit(): void {
    // Verifica o tipo de usuário (CLIENTE ou EMPRESA)
    this.authService.getCurrentUserRole().subscribe((role: string) => {
      // Remove o prefixo 'ROLE_' se ele existir
      const cleanRole = role.startsWith('ROLE_') ? role.substring(5) : role;
      console.log("User role:", cleanRole); // Log para verificar o papel do usuário

      if (cleanRole === 'EMPRESA') {
        // Se for EMPRESA, busca apenas as empresas do usuário autenticado
        this.apiService.get('empresas/minhas').subscribe(
          (data: any) => {
            console.log("Empresas carregadas:", data); // Log para verificar os dados recebidos
            this.companies = data;
            this.isLoading = false;
          },
          (error: any) => {
            console.error("Erro ao carregar empresas do usuário:", error);
            this.isLoading = false;
          }
        );
      } else if (cleanRole === 'CLIENTE') {
        // Se for CLIENTE, busca todas as empresas
        this.apiService.get('empresas').subscribe(
          (data: any) => {
            console.log("Empresas carregadas:", data); // Log para verificar os dados recebidos
            this.companies = data;
            this.isLoading = false;
          },
          (error: any) => {
            console.error("Erro ao carregar empresas:", error);
            this.isLoading = false;
          }
        );
      } else {
        console.error("Role desconhecida:", cleanRole);
        this.isLoading = false;
      }
    });
  }

  editEmpresa(empresa: any): void {
    this.router.navigate([`/editar-empresa/${empresa.id}`]);
  }

  editMenu(empresa: any): void {
    this.router.navigate([`/menus/${empresa.id}`]);
  }

  manageTables(empresa: any): void {
    this.router.navigate([`/gerenciar-mesas/${empresa.id}`]); // Navega para o componente de gerenciamento de mesas
  }

  deleteEmpresa(empresa: any): void {
    if (confirm(`Tem certeza que deseja excluir a empresa ${empresa.nome}?`)) {
      this.apiService.delete(`empresas/${empresa.id}`).subscribe(
        () => {
          this.companies = this.companies.filter((c) => c.id !== empresa.id);
          alert('Empresa excluída com sucesso.');
        },
        (error: any) => {
          console.error('Erro ao excluir empresa:', error);
          alert('Ocorreu um erro ao tentar excluir a empresa.');
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
