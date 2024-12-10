import { Recipe } from "./recipe";

export interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserForAuth {
    email: string;
    username: string;
    password: string;
    _id: string;
  }
  

  export interface ProfileDetails {
    username: string;
    email: string;
  }
  