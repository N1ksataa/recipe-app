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
        // Регистрация на потребителя
        const user = await userService.register(username, email, password);

        // Логване на потребителя (връщане на token)
        const result = await userService.login(username, password); // result ще съдържа токена и потребителската информация

        res.cookie('token', result.token, { httpOnly: true }); // Задаваме cookie
        res.json(user); // Връщаме потребителя (без паролата)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Логин
userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверка и връщане на токен и потребителска информация
        const result = await userService.login(username, password);

        res.cookie('token', result.token, { httpOnly: true }); // Задаваме cookie с токена

        // Връщаме отговора без паролата
        res.json({
            recipes: result.user.recipes || [],
            _id: result.user._id,
            email: result.user.email,
            username: result.user.username,
            createdAt: result.user.createdAt,
            updatedAt: result.user.updatedAt,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Взимаме потребителя
        const user = await userService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Взимаме рецепти, ако има такива
        const recipes = await recipeService.getRecipesByUserId(req.user.id).catch(() => []);
        
        // Връщаме отговора
        res.json({ 
            ...user._doc,  // User данни
            recipes        // Рецепти (празен масив, ако няма)
        });
    } catch (err) {
        res.status(500).json({ message: `Error fetching profile: ${err.message}` });
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
      res.json(updatedUser); // Връща само username и email
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
