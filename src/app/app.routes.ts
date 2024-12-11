import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noAuth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
  },

  { 
    path: 'login', 
    loadComponent: () => import('./user/login/login.component').then(m => m.LoginComponent),
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('./user/register/register.component').then(m => m.RegisterComponent),
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./user/profile/profile.component').then(m => m.ProfileComponent), 
    canActivate: [AuthGuard] 
  },

  { 
    path: 'recipes', 
    loadComponent: () => import('./recipe/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) 
  },
  { 
    path: 'recipes/:id', 
    loadComponent: () => import('./recipe/current-recipe/current-recipe.component').then(m => m.CurrentRecipeComponent) 
  },
  { 
    path: 'recipes/:id/edit', 
    loadComponent: () => import('./recipe/edit-recipe/edit-recipe.component').then(m => m.EditRecipeComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'search', 
    loadComponent: () => import('./recipe/search/search.component').then(m => m.SearchComponent) 
  },
  { 
    path: 'my-recipes', 
    loadComponent: () => import('./recipe/my-recipes/my-recipes.component').then(m => m.MyRecipesComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create-recipe', 
    loadComponent: () => import('./recipe/create-recipe/create-recipe.component').then(m => m.CreateRecipeComponent), 
    canActivate: [AuthGuard] 
  },

  { 
    path: '404', 
    loadComponent: () => import('./error/error.component').then(m => m.PageNotFoundComponent) 
  },
  { 
    path: '**', 
    redirectTo: '/404' 
  }
];
