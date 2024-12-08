import Recipe from '../models/Recipe.js';

const recipeService = {
    async createRecipe(title, category, description, ingredients, preparation, image, authorId) {
        try {
            const recipe = new Recipe({
                title,
                category,
                description,
                ingredients,
                preparation,
                image,
                authorId,
            });

            await recipe.save();
            return recipe;
        } catch (err) {
            throw new Error('Error creating recipe: ' + err.message);
        }
    },

    async getAllRecipes() {
        try {
            return await Recipe.find()
                .populate('authorId', 'username email')
                .populate('likes', 'username');
        } catch (err) {
            throw new Error('Error fetching recipes: ' + err.message);
        }
    },

    async getRecipeById(id) {
        try {
            const recipe = await Recipe.findById(id)
                .populate('authorId', 'username email')
                .populate('likes', 'username');
            if (!recipe) {
                throw new Error('Recipe not found');
            }
            return recipe;
        } catch (err) {
            throw new Error('Error fetching recipe by ID: ' + err.message);
        }
    },

    async getRecipesByUserId(userId) {
        try {
            const recipes = await Recipe.find({ authorId: userId }).populate('authorId', 'username email');
            if (recipes.length === 0) {
                throw new Error('No recipes found for this user');
            }
            return recipes;
        } catch (err) {
            throw new Error('Error fetching recipes by user ID: ' + err.message);
        }
    },

    async updateRecipe(id, title, category, description, ingredients, preparation, image, userId) {
        try {
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                throw new Error('Recipe not found');
            }

            // Проверка дали текущият потребител е автор на рецептата
            if (String(recipe.authorId) !== String(userId)) {
                throw new Error('You are not the author of this recipe');
            }

            if (title) recipe.title = title;
            if (category) recipe.category = category;
            if (description) recipe.description = description;
            if (ingredients) recipe.ingredients = ingredients;
            if (preparation) recipe.preparation = preparation;
            if (image) recipe.image = image;

            await recipe.save();
            return recipe;
        } catch (err) {
            throw new Error('Error updating recipe: ' + err.message);
        }
    },

    async deleteRecipe(id, userId) {
        try {
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                throw new Error('Recipe not found');
            }

            // Проверка дали текущият потребител е автор на рецептата
            if (String(recipe.authorId) !== String(userId)) {
                throw new Error('You are not the author of this recipe');
            }

            await Recipe.findByIdAndDelete(id);
            return { message: 'Recipe deleted successfully' };
        } catch (err) {
            throw new Error('Error deleting recipe: ' + err.message);
        }
    },

    async likeRecipe(id, userId) {
        try {
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                throw new Error('Recipe not found');
            }
    
            // Проверка дали текущият потребител е автор на рецептата
            if (String(recipe.authorId) === String(userId)) {
                throw new Error('You cannot like your own recipe');
            }
    
            // Проверка дали потребителят вече е лайкнал рецептата
            if (recipe.likes.includes(userId)) {
                // Ако е лайкнал, премахваме го от лайковете
                recipe.likes.pull(userId);
            } else {
                // Ако не е лайкнал, добавяме го в лайковете
                recipe.likes.push(userId);
            }
    
            await recipe.save();
            return recipe;
        } catch (err) {
            throw new Error('Error liking recipe: ' + err.message);
        }
    }
    
};

export default recipeService;
