import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'

})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  userId = 'canko56';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => (this.recipes = recipes));
  }

  isLiked(recipe: Recipe): boolean {
    return recipe.likes.includes(this.userId);
  }

  toggleLike(recipe: Recipe): void {
    if (this.isLiked(recipe)) {
      recipe.likes = recipe.likes.filter(id => id !== this.userId);
    } else {
      recipe.likes.push(this.userId);
    }

    this.apiService.updateRecipe(recipe._id, { likes: recipe.likes }).subscribe();
  }
}
