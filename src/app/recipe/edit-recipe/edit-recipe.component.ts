import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'snacks', label: 'Snacks' }
  ];
  recipeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required, Validators.pattern('^https://.*')]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ingredients: this.fb.array([this.createIngredient()]),
      preparation: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.apiService.getRecipeById(this.recipeId).subscribe(recipe => {
        this.populateForm(recipe);
      });
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(ingredient: string = ''): FormGroup {
    return this.fb.group({
      name: [ingredient, [Validators.required, Validators.minLength(5)]]
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }
  

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  populateForm(recipe: any): void {
    const matchingCategory = this.categories.find(cat => 
      cat.value === recipe.category || cat.label === recipe.category
    )?.value || '';
  
    this.recipeForm.patchValue({
      title: recipe.title,
      image: recipe.image,
      category: matchingCategory,
      description: recipe.description,
      preparation: recipe.preparation,
    });
  
    const ingredients = recipe.ingredients.map((ingredient: string) => this.createIngredient(ingredient));
    this.ingredients.clear();
    ingredients.forEach((ingredient: any) => this.ingredients.push(ingredient));
  }
  

  onSubmit(): void {
    const { title, image, category, description, preparation } = this.recipeForm.value;
    const ingredients = this.recipeForm.get('ingredients')?.value.map((ingredient: { name: string }) => ingredient.name);
    const formattedCategory = this.categories.find(cat => cat.value === category)?.label || '';

    const recipeData = {
      title, image, category: formattedCategory, description, ingredients, preparation
    };

    if (this.recipeId) {
      this.apiService.updateRecipe(this.recipeId, recipeData).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    }
  }
}
