import { User } from "./user";

export interface Recipe {
    _id: string;
    title: string;
    category: string;
    description: string;
    ingredients: string[];
    preparation: string;
    image: string;
    authorId: User;
    likes: string[];
    likedByUser?: boolean;
    createdAt: string;
    updatedAt: string;
}
  