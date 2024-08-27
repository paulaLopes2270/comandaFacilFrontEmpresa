import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-list-component.component.html',
  styleUrls: ['./menu-list-component.component.css'],
})
export class MenuListComponent implements OnInit {
  empresaId: number = 0;
  menus: any[] = []; // Inicializa com uma lista vazia
  loading: boolean = true; // Variável de controle de loading

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true; // Inicia o carregamento
    
    // Pegando o ID diretamente
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));
    console.log('Empresa ID obtido da URL:', this.empresaId);

    // Fazendo a requisição diretamente com forceRefresh = true para ignorar o cache
    this.apiService.get<any[]>(`menus/empresa/${this.empresaId}`, true).subscribe(
      (menus) => {
        console.log('Dados recebidos da API (sem cache):', menus);
        this.menus = menus;
        this.loading = false; // Parar o loading após receber os dados
      },
      (error) => {
        console.error('Erro ao carregar menus:', error);
        this.loading = false; // Parar o loading em caso de erro
      }
    );
  }

  editMenu(menuId: number): void {
    console.log('Navegando para edição de menu com empresaId:', this.empresaId, 'e menuId:', menuId);
    this.router.navigate([`/menu-edit`, this.empresaId, menuId]);
  }
  
  deleteMenu(menuId: number): void {
    if (confirm('Você tem certeza que deseja excluir este item?')) {
      this.apiService.delete(`menus/${menuId}`).subscribe(
        () => {
          console.log('Item excluído com sucesso');
          this.apiService.clearCache(); // Limpa o cache para garantir que os dados sejam atualizados
          this.ngOnInit(); // Recarrega os menus após exclusão
        },
        (error) => {
          console.error('Erro ao excluir item', error);
        }
      );
    }
  }

  navigateToMenuRegister(): void {
    this.router.navigate([`/menu-register/${this.empresaId}`]);
  }

  getCategorias(menus: any[]): string[] {
    return [...new Set(menus.map(menu => menu.categoria))];
  }

  getMenuByCategoria(menus: any[], categoria: string): any[] {
    return menus.filter(menu => menu.categoria === categoria);
  }
}
