import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateTableComponent } from '../create-table/create-table.component';

@Component({
  selector: 'app-table-management',
  standalone: true,
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css'],
  imports: [CommonModule, RouterModule, CreateTableComponent]
})
export class TableManagementComponent implements OnInit, OnDestroy {
  tables: any[] = [];
  empresaId: string = '';
  isLoading: boolean = true;
  selectedTable: any = null;
  isAdding: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('empresaId') || '';
    this.loadTables();
  }

  ngOnDestroy(): void {}

  loadTables(): void {
    this.isLoading = true;
    this.apiService.get(`mesas/empresa/${this.empresaId}`).subscribe(
      (data: any) => {
        this.tables = data;
        this.isLoading = false;  // Desativa o loading após carregar as mesas
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Erro ao carregar mesas:', error);
        this.isLoading = false;  // Mesmo se houver erro, desativa o loading
        this.cdr.detectChanges();
      }
    );
  }

  editTable(table: any): void {
    console.log('Mesa selecionada para edição:', table);
    this.selectedTable = { ...table };  // Clona o objeto para garantir que as mudanças sejam detectadas
    this.isAdding = false;  // Muda para o modo de edição
    this.cdr.detectChanges();  // Garante que as mudanças no estado do componente sejam detectadas
  }

  deleteTable(table: any): void {
    if (confirm(`Tem certeza que deseja excluir a mesa ${table.numero}?`)) {
      this.apiService.delete(`mesas/${table.id}`).subscribe(
        () => {
          this.tables = this.tables.filter(t => t.id !== table.id);  // Remove a mesa da lista local
          alert('Mesa excluída com sucesso.');
        },
        (error: any) => {
          console.error('Erro ao excluir mesa:', error);
          alert('Ocorreu um erro ao tentar excluir a mesa.');
        }
      );
    }
  }

  addTable(): void {
    this.selectedTable = null;  // Limpa a mesa selecionada para garantir que está no modo de criação
    this.isAdding = true;  // Define o estado para adicionar uma nova mesa
  }

  handleFormSubmit(table: any): void {
    if (this.selectedTable) {
      // O ID da mesa selecionada deve ser usado na edição
      table.id = this.selectedTable.id;  // Garante que o ID seja passado corretamente
      this.apiService.put(`mesas/${table.id}`, table).subscribe(() => {
        this.loadTables();  // Recarrega a lista de mesas após a edição
        this.selectedTable = null;
        this.isAdding = false;
      });
    } else {
      // Se não houver mesa selecionada, estamos no modo de criação
      const empresaId = this.empresaId;
      this.apiService.post(`mesas/empresa/${empresaId}`, table).subscribe(() => {
        this.loadTables();  // Recarrega a lista de mesas após a criação
        this.isAdding = false;
      });
    }
  }

  toggleTableOccupation(table: any): void {
    const newStatus = !table.ocupadaManualmente;
    this.apiService.put(`mesas/${table.id}/ocupar`, { ocupar: newStatus }).subscribe(
      () => {
        table.ocupadaManualmente = newStatus; // Atualiza o estado localmente
        alert(`Mesa ${table.numero} agora está ${newStatus ? 'ocupada' : 'livre'}.`);
        this.cdr.detectChanges(); // Atualiza a tela
      },
      (error: any) => {
        console.error('Erro ao atualizar ocupação da mesa:', error);
        alert('Ocorreu um erro ao tentar atualizar a ocupação da mesa.');
      }
    );
  }

  goToReservations(): void {
    this.router.navigate(['/reservas', this.empresaId]);
  }
}
