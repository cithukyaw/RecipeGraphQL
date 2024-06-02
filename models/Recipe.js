import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: String,
    thumbsUp:Number,
    thumbsDown:Number,
});

export default mongoose.model('Recipe', recipeSchema);
