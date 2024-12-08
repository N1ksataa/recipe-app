import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    preparation: { type: String, required: true },
    image: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

recipeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
