import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register-company/register.component';
import { MenuRegisterComponent } from './components/menu-register/menu-register.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MenuListComponent } from './components/menu-list-component/menu-list-component.component';
import { TableManagementComponent } from './components/table-management/table-management.component';
import { CreateTableComponent } from './components/create-table/create-table.component';
import { RegisterUserCompanyComponent } from './components/register-user-company/register-user-company.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component'; // Importe o componente de gerenciamento de reservas
import { AuthGuard } from './services/auth.guard'; // Importando o AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // Rota aberta para criar uma nova empresa
  { path: 'register-user', component: RegisterUserCompanyComponent }, // Nova rota aberta para o cadastro do usuário empresa
  
  // Rotas protegidas pelo AuthGuard
  { path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'menu-register/:empresaId', component: MenuRegisterComponent, canActivate: [AuthGuard] }, 
  { path: 'menus/:empresaId', component: MenuListComponent, canActivate: [AuthGuard] }, 
  { path: 'editar-empresa/:id', component: RegisterComponent, canActivate: [AuthGuard] }, 
  { path: 'menu-edit/:empresaId/:menuId', component: MenuRegisterComponent, canActivate: [AuthGuard] }, 
  { 
    path: 'gerenciar-mesas/:empresaId', 
    component: TableManagementComponent, 
    canActivate: [AuthGuard], 
    runGuardsAndResolvers: 'always', 
  },
  { 
    path: 'editar-mesa/:empresaId/:mesaId', 
    component: CreateTableComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reservas/:empresaId', // Adicione esta rota
    component: ReservationManagementComponent, 
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
