import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-register.component.html',
  styleUrls: ['./menu-register.component.css']
})
export class MenuRegisterComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  menu = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagemBase64: ''
  };
  categorias: string[] = [];
  empresaId: number = 0;
  menuId: number | null = null;
  loading: boolean = false; // Controla o estado de carregamento

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));
    this.menuId = this.route.snapshot.paramMap.get('menuId') ? Number(this.route.snapshot.paramMap.get('menuId')) : null;

    // Inicia o carregamento das categorias e do item de menu (se for edição)
    this.loading = true;
    
    // Carregar categorias
    this.apiService.get('categorias').subscribe(
      (data: any) => {
        this.categorias = data as string[];
        
        // Se estamos editando um item de menu, carregar os dados do item
        if (this.menuId) {
          this.apiService.get(`menus/${this.menuId}`).subscribe(
            (data: any) => {
              this.menu = data;
              if (this.menu.imagemBase64) {
                this.selectedImage = 'data:image/png;base64,' + this.menu.imagemBase64;
              }
              this.loading = false; // Carregamento concluído
            },
            (error) => {
              console.error('Erro ao carregar os dados do menu', error);
              this.loading = false; // Em caso de erro, parar o carregamento
            }
          );
        } else {
          this.loading = false; // Se não é edição, parar o carregamento
        }
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
        this.loading = false; // Em caso de erro, parar o carregamento
      }
    );
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64String = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
          this.selectedImage = reader.result;
          this.menu.imagemBase64 = base64String;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log('Enviando dados do menu:', this.menu);

    this.loading = true;
    if (this.menuId) {
      this.apiService.put(`menus/${this.menuId}`, this.menu).subscribe(
        response => {
          console.log('Menu atualizado:', response);
          this.loading = false;
          this.router.navigate(['/menus', this.empresaId]);
        },
        error => {
          console.error('Erro ao atualizar o menu', error);
          this.loading = false;
        }
      );
    } else {
      this.apiService.post(`menus/empresa/${this.empresaId}`, this.menu).subscribe(
        response => {
          console.log('Menu cadastrado:', response);
          this.loading = false;
          this.menu = {
            nome: '',
            descricao: '',
            preco: 0,
            categoria: '',
            imagemBase64: ''
          };
          this.selectedImage = null;
          this.router.navigate(['/menus', this.empresaId]);
        },
        error => {
          console.error('Erro ao cadastrar o menu', error);
          this.loading = false;
        }
      );
    }
  }
}
