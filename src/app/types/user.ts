import { Recipe } from "./recipe";

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    recipes: Recipe[];
}

export interface UserForAuth {
    email: string;
    username: string;
    password: string;
    id: string;
  }
  