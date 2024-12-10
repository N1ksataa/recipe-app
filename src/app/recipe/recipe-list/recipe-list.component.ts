import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'

})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  userId: string | null = null;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userId = user._id;
        console.log(user);
      }
    });

    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  isLiked(recipe: Recipe): boolean {
    if (!this.userId){
      console.error('User is not logged in.')
      return false;
    }

    // Проверява дали текущият потребител е харесал рецептата
    return recipe.likes.includes(this.userId);
  }

  toggleLike(recipe: Recipe): void {
    // Проверяваме дали userId не е null
    if (!this.userId) {
      console.error('User is not logged in.');
      return;
    }
  
    if (this.isLiked(recipe)) {
    recipe.likes = recipe.likes.filter((id) => id !== this.userId);  // Премахване на лайка
  } else {
    recipe.likes.push(this.userId);  // Добавяне на лайк
  }

  // Актуализиране на сървъра
  this.apiService.likeRecipe(recipe._id, recipe.likes).subscribe({
    next: () => {
      console.log('Recipe updated successfully!');
      // Локално обновяване на рецептата в масива
      const updatedRecipeIndex = this.recipes.findIndex(r => r._id === recipe._id);
      if (updatedRecipeIndex !== -1) {
        this.recipes[updatedRecipeIndex] = { ...recipe };  // Променяме рецептата в локалния масив
      }
    },
    error: (err) => console.error('Error updating recipe:', err),
  });
}
  
}
