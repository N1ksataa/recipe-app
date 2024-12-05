import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class CreateRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: [''],
      image: [''],
      category: [''],
      description: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      preparation: ['']
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({ name: [''] });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }
}