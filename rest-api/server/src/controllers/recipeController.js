import { Router } from 'express';
import recipeService from '../services/recipeService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const recipeController = Router();

// Създаване на нова рецепта
recipeController.post('/', authMiddleware, async (req, res) => {
    const { title, category, description, ingredients, preparation, image } = req.body;
    const authorId = req.user._id;

    try {
        const recipe = await recipeService.createRecipe(title, category, description, ingredients, preparation, image, authorId);
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Вземане на всички рецепти
recipeController.get('/', async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Вземане на рецепта по ID
recipeController.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await recipeService.getRecipeById(id);
        res.json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Актуализиране на рецепта
recipeController.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, category, description, ingredients, preparation, image } = req.body;
    const userId = req.user._id; // Вземане на ID на логнатия потребител

    try {
        const updatedRecipe = await recipeService.updateRecipe(id, title, category, description, ingredients, preparation, image, userId);
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Изтриване на рецепта
recipeController.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Вземане на ID на логнатия потребител

    try {
        const result = await recipeService.deleteRecipe(id, userId);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Лайкване на рецепта
recipeController.put('/:id/like', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Вземане на ID на логнатия потребител

    try {
        const updatedRecipe = await recipeService.likeRecipe(id, userId);
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default recipeController;
