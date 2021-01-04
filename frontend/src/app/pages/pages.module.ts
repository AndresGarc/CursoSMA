import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { BreadcrumbComponent } from '../common/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UsuariosComponent,
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  exports: [
    AdminLayoutComponent,
    DashboardComponent,
    UsuariosComponent,
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
