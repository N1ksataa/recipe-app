import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent]
})

export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  isLoading: boolean = true;

  categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'snacks', label: 'Snacks' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
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
    setTimeout(() => {
      this.isLoading = false;
    }, 50);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
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

  getFormattedCategory(value: string): string {
    return this.categories.find(category => category.value === value)?.label || '';
  }

  onSubmit(): void {
    const { title, image, category, description, preparation } = this.recipeForm.value;
    const ingredients = this.recipeForm.get('ingredients')?.value.map((ingredient: { name: string; }) => ingredient.name);
    const formattedCategory = this.getFormattedCategory(category);

    this.apiService.createRecipe(title, image, formattedCategory, description, ingredients, preparation).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}