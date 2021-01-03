import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UsuariosComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
