import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-create-table',
  standalone: true,
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css'],
  imports: [ReactiveFormsModule, CommonModule]  
})
export class CreateTableComponent implements OnInit, OnChanges {
  @Input() table: any = null;  // Dados da mesa para edição ou null para nova mesa
  @Output() formSubmit = new EventEmitter<any>();

  tableForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tableForm = this.fb.group({
      numero: ['', Validators.required],
      capacidade: ['', Validators.required],
      area: ['INTERNA', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('CreateTableComponent inicializado');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['table'] && changes['table'].currentValue) {
      const tableData = changes['table'].currentValue;
      console.log('Dados recebidos para edição no CreateTableComponent:', tableData);
      
      // Aplicar os valores ao formulário
      if (tableData) {
        this.tableForm.patchValue({
          numero: tableData.numero || '',
          capacidade: tableData.capacidade || '',
          area: tableData.area || 'INTERNA'
        });
      }
    }
  }

  onSubmit(): void {
    if (this.tableForm.valid) {
      const formValue = this.tableForm.value;
      formValue.numero = Number(formValue.numero);  // Converter o campo 'numero' para número
      this.formSubmit.emit(formValue);  // Emitir os dados do formulário
    }
  }
}
