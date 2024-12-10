import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "./types/recipe";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getRecipes() {
        return this.http.get<Recipe[]>(`/api/recipes`);
    }

    getRecipeById(id: string) {
        return this.http.get<Recipe>(`/api/recipes/${id}`);
    }

    createRecipe(title: string, image: string, category: string, description: string, ingredients: string[], preparation: string) {
        const payload = { title, image, category, description, ingredients, preparation };
        return this.http.post<Recipe>(`/api/recipes`, payload);
    }
    

    likeRecipe(id: string, userId: string) {
        return this.http.put<Recipe>(`/api/recipes/${id}/like`, { userId });
    }

    updateRecipe(id: string, recipeData: Partial<Recipe>) {
        return this.http.put<Recipe>(`/api/recipes/${id}`, recipeData);
    }

    deleteRecipe(id: string) {
        return this.http.delete(`/api/recipes/${id}`);
    }
}
