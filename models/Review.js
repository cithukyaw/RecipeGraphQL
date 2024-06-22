import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: Number,
    content: String,
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
});

export default mongoose.model('Review', reviewSchema);
