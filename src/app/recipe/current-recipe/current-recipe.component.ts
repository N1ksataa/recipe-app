import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Recipe } from '../../types/recipe';

@Component({
  selector: 'app-current-recipe',
  templateUrl: './current-recipe.component.html',
  imports: [CommonModule],
  styleUrl: './current-recipe.component.css'

})
export class CurrentRecipeComponent implements OnInit {
  recipe!: Recipe;
  userId: string = 'canko56';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const recipeId: string | null = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.apiService.getRecipeById(recipeId).subscribe(recipe => {
        this.recipe = recipe;
      });
    }
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
