import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
})
export class ReservationManagementComponent implements OnInit {
  reservations: any[] = [];
  filterForm: FormGroup;
  empresaId: string = '';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.filterForm = this.fb.group({
      dateFilter: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.empresaId = this.getEmpresaIdFromUrl();
    this.loadReservations();

    this.filterForm.get('dateFilter')?.valueChanges.subscribe((date) => {
      if (date) {
        this.filterReservationsByDate(date);
      } else {
        this.loadReservations();
      }
    });
  }

  loadReservations(): void {
    const endpoint = `reservas/empresa/${this.empresaId}`;
    this.apiService.get<any[]>(endpoint).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); // Verifique se os dados estão corretos
        this.reservations = data;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      },
    });
  }

  filterReservationsByDate(date: string): void {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Data formatada enviada para a API:', formattedDate);
    const endpoint = `reservas/empresa/${this.empresaId}?date=${formattedDate}`;
    this.apiService.get<any[]>(endpoint).subscribe({
      next: (data) => {
        this.reservations = data;
        console.log('Reservas filtradas recebidas:', this.reservations);
      },
      error: (error) => {
        console.error('Error filtering reservations:', error);
      },
    });
}



  getEmpresaIdFromUrl(): string {
    const url = window.location.href;
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
}
