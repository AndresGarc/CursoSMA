import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../auth/login/login.component';
import { RecoveryComponent } from '../auth/recovery/recovery.component';

const routes: Routes = [
  { path: 'login', component: AuthLayoutComponent,    //ruta login
    children: [
      { path: '', component: LoginComponent},
      { path: '**', redirectTo: ''} //si añaden algo despues de login/++++ no hace na
    ]
  },
  { path: 'recovery', component: AuthLayoutComponent,
    children: [
      { path: '', component: RecoveryComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
