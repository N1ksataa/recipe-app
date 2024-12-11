import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Appetizer', 'Main Course', 'Dessert', 'Snacks'];

  userId: string | null = null;
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userId = user._id;
      }
    });

    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
      this.isLoading = false;
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter((recipe) => {
      const matchesName = recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory ? recipe.category === this.selectedCategory : true;
      return matchesName && matchesCategory;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filterRecipes();
  }
}
