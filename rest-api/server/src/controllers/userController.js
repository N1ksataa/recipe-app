import { Router } from 'express';
import userService from '../services/userService.js';
import recipeService from '../services/recipeService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

// Връща всички потребители
userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Регистрация
userController.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await userService.register(username, email, password);
        const result = await userService.login(username, password);

        res.cookie('token', result.token, { httpOnly: true }); // Задаване на cookie
        res.json({ username: result.username, email: result.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Логин
userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await userService.login(username, password);

        res.cookie('token', result.token, { httpOnly: true }); // Задаване на cookie
        res.json({ username: result.username, email: result.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Връща профил на потребителя, включително рецепти
userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        const recipes = await recipeService.getRecipesByUserId(req.user.id); // Ако има такава функция
        res.json({ ...user._doc, recipes });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

userController.post('/logout', authMiddleware, (req, res) => {
    res.clearCookie('token'); // Изчистване на cookie-то
    res.json({ message: 'Logged out successfully' });
});

userController.get('/profile', authMiddleware, async (req, res) => {
    res.json(req.user);
});

// Актуализиране на профила (потребителско име и имейл)
userController.put('/profile', authMiddleware, async (req, res) => {
    const { username, email } = req.body;
    
    try {
        const updatedUser = await userService.updateUser(req.user.id, { username, email });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Актуализиране на паролата
userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default userController;
