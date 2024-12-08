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
  userId = 'canko556';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => (this.recipes = recipes));
  }

  isLiked(recipe: Recipe): boolean {
    return recipe.likes.includes(this.userId);
  }

  toggleLike(recipe: Recipe): void {
    // Тук ще добавим или премахнем userId от likes масива
    if (this.isLiked(recipe)) {
      // Премахваме лайка
      recipe.likes = recipe.likes.filter(id => id !== this.userId);
    } else {
      // Добавяме лайк
      recipe.likes.push(this.userId);
    }

    // Може да добавите API заявка за актуализиране на рецептата на сървъра тук
    this.apiService.updateRecipe(recipe._id, { likes: recipe.likes }).subscribe();
  }
}
