import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  userId: string | null = null;
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userId = user._id;
        this.loadMyRecipes();
      }
    });
  }

  loadMyRecipes(): void {
    this.isLoading = true; // Започваме с индикатор за зареждане
    this.apiService.getRecipes().subscribe({
      next: (recipes) => {
        this.filteredRecipes = recipes.filter(recipe => recipe.authorId._id === this.userId);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}