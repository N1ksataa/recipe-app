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
    const likes = recipe.likes.map((e) => {
      if(typeof e === 'object'){
        return e._id
      }
      return e
    })
    return likes.includes(this.userId?.toString()!);
  }

  private checkUserLikeStatus(): void {
    if (!this.userId || !this.recipe) return;

    const likes = this.recipe.likes.map((e) => {
      return e._id
    })

    const hasLiked = likes.includes(this.userId?.toString());
    this.recipe.likedByUser = hasLiked;
  }
}
