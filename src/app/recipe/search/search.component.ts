import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Appetizer', 'Main Course', 'Dessert'];

  userId = 'canko56';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter((recipe) => {
      const matchesName = recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory ? recipe.category === this.selectedCategory : true;
      return matchesName && matchesCategory;
    });
  }

  isLiked(recipe: Recipe): boolean {
    return recipe.likes.includes(this.userId);
  }

  toggleLike(recipe: Recipe): void {
    if (this.isLiked(recipe)) {
      recipe.likes = recipe.likes.filter((id) => id !== this.userId);
    } else {
      recipe.likes.push(this.userId);
    }
    this.apiService.updateRecipe(recipe._id, { likes: recipe.likes }).subscribe();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filterRecipes();
  }
}

