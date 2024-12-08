import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "./types/recipe";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = `${environment.apiUrl}/recipes`;

    constructor(private http: HttpClient) {}

    getRecipes() {
        return this.http.get<Recipe[]>(this.apiUrl);
    }

    getRecipeById(id: string) {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
    }

    createRecipe(recipeData: Partial<Recipe>) {
        return this.http.post<Recipe>(this.apiUrl, recipeData);
    }

    updateRecipe(id: string, recipeData: Partial<Recipe>) {
        return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipeData);
    }

    deleteRecipe(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    likeRecipe(id: string, userId: string) {
        return this.http.post<Recipe>(`${this.apiUrl}/${id}/like`, { userId });
    }
}
