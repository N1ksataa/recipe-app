import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},





  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'}
];
