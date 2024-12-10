import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userService = {
    async getAllUsers() {
        return await User.find();
    },

    async register(username, email, password) {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            throw new Error('Username already exists');
        }
    
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            throw new Error('Email already exists');
        }
    
        const user = new User({ username, email, password, recipes: [] });
        const savedUser = await user.save();
    
        const userWithoutPassword = savedUser.toObject(); // Преобразуваме в обикновен обект
        delete userWithoutPassword.password; // Премахваме полето password
    
        return userWithoutPassword;
    },
    


    async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }
    
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    
        // Преобразуваме потребителя в обикновен обект, за да премахнем паролата
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
    
        return { token, user: userWithoutPassword };
    },
    
    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUser(id, data) {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
      
        // Проверка за новото потребителско име
        if (data.username && data.username !== user.username) {
          const existingUsername = await User.findOne({ username: data.username });
          if (existingUsername) {
            throw new Error('Username already exists');
          }
          user.username = data.username;
        }
      
        // Проверка за новия имейл
        if (data.email && data.email !== user.email) {
          const existingEmail = await User.findOne({ email: data.email });
          if (existingEmail) {
            throw new Error('Email already exists');
          }
          user.email = data.email;
        }
      
        await user.save();
        return { username: user.username, email: user.email }; // Връщане само на необходимите данни
      },

    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);
        if (!user || !(await user.comparePassword(oldPassword))) {
            throw new Error('Invalid old password');
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    }
};
export default userService;