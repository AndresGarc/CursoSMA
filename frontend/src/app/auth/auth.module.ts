import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../auth/login/login.component';
import { RecoveryComponent } from '../auth/recovery/recovery.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
