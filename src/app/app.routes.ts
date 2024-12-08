import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './error/error.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CurrentRecipeComponent } from './recipe/current-recipe/current-recipe.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},

  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: CurrentRecipeComponent },
  
  {path: 'create-recipe', component: CreateRecipeComponent},


  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'}
];
