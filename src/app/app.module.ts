import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component;
import { TableManagementComponent } from './components/table-management/table-management.component';

@NgModule({
  declarations: [
    AppComponent,
    TableManagementComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule  // Importação do CommonModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
