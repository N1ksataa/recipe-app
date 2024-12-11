import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Recipe } from '../../types/recipe';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-current-recipe',
  templateUrl: './current-recipe.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./current-recipe.component.css']
})
export class CurrentRecipeComponent implements OnInit {
  recipe!: Recipe;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id')!;
      
      this.apiService.getRecipeById(recipeId).subscribe(recipe => {
        this.recipe = recipe;

        this.userService.getCurrentUser().subscribe(user => {
          this.userId = user ? user._id : null;
          this.checkUserLikeStatus();
        });
      });
    });
  }


  onEdit(): void {
    this.router.navigate([`/recipes/${this.recipe._id}/edit`]);
  }

  deleteRecipe(): void {
    if (!this.recipe || !this.recipe._id) {
      console.error('No recipe to delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this recipe?')) {
      this.apiService.deleteRecipe(this.recipe._id).subscribe(() => {
        alert('Recipe deleted successfully.');
        this.router.navigate(['/recipes']);
      });
    }
  }

  toggleLike(recipe: Recipe): void {
    if (this.userId) {
      this.apiService.likeRecipe(recipe._id, this.userId).subscribe(updatedRecipe => {
        this.recipe = updatedRecipe;
        this.checkUserLikeStatus();
      });
    }
  }

  isLiked(recipe: Recipe): boolean {
    return recipe.likedByUser ?? recipe.likes.includes(this.userId!);
  }

  private checkUserLikeStatus(): void {
    if (!this.userId || !this.recipe) return;

    const hasLiked = this.recipe.likes.includes(this.userId);
    this.recipe.likedByUser = hasLiked;
  }
  
}
