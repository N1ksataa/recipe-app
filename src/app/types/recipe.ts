import { User } from "./user";

export interface Recipe {
    title: string;
    category: string;
    description: string;
    ingredients: string[];
    preparation: string;
    image: string;
    authorId: User;
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}
  