import { Recipe } from "./recipe";

export interface User {
    _id: string;
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
  

  export interface ProfileDetails {
    username: string;
    email: string;
  }
  