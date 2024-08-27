import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  empresaId: number = 0;
  menus: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));
    this.loadMenus();
  }

  loadMenus(): void {
    this.apiService.get(`menus/empresa/${this.empresaId}`).subscribe(
      (data: any[]) => {
        this.menus = data;
      },
      (error) => {
        console.error('Erro ao carregar menus', error);
      }
    );
  }

  getCategorias(): string[] {
    return [...new Set(this.menus.map(menu => menu.categoria))];
  }

  getMenuByCategoria(categoria: string): any[] {
    return this.menus.filter(menu => menu.categoria === categoria);
  }

  editMenu(menuId: number): void {
    this.router.navigate([`/menu-register/${this.empresaId}`, menuId]);
  }

  deleteMenu(menuId: number): void {
    if (confirm('Você tem certeza que deseja excluir este item?')) {
      this.apiService.delete(`menus/${menuId}`).subscribe(
        () => {
          this.loadMenus(); // Recarrega a lista de menus após exclusão
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
}
