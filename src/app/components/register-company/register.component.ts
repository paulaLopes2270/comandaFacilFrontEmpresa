import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  empresaData: any = {
    id: null,
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    imagemBase64: ''
  };
  isEditMode: boolean = false;
  isLoading: boolean = false;  // Variável para controle do carregamento

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const empresaId = this.route.snapshot.paramMap.get('id');
    if (empresaId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.apiService.get(`empresas/${empresaId}`).subscribe(
        (data: any) => {
          this.empresaData = data;
          if (this.empresaData.imagemBase64) {
            this.selectedImage = 'data:image/png;base64,' + this.empresaData.imagemBase64;
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Erro ao carregar empresa para edição:', error);
          this.isLoading = false;
        }
      );
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.selectedImage = reader.result;
          this.empresaData.imagemBase64 = (reader.result as string).split(',')[1];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.apiService.post('empresas', this.empresaData).subscribe(
      (response: any) => {
        console.log('Cadastro da empresa concluído.', response);
        this.isLoading = false;
        this.router.navigate(['/company-list']);
      },
      (error: any) => {
        console.error('Erro ao cadastrar a empresa', error);
        this.isLoading = false;
      }
    );
  }
}
