import Review from "../models/Review.js";
import Recipe from "../models/Recipe.js";
import Author from "../models/Author.js";

export const reviewResolvers = {
    Query: {
        async review(_, {id}) {
            return Review.findById(id);
        },
        async reviews(_, {limit}) {
            return Review.find().sort({rating: -1}).limit(limit);
        },
    },
    Review: {
        recipe: async (parent, args, context, info) => {
            const recipe = await Recipe.findById(parent.recipeId);
            if (!recipe) {
                throw new Error('Recipe not found');
            }

            return recipe;
        },
        author: async (parent, args, context, info) => {
            const author = await Author.findById(parent.authorId);
            if (!author) {
                throw new Error('Author not found');
            }

            return author;
        },
    },
    Mutation: {
        async createReview(_, { input }, context) {
            const review = new Review(input);
            const res = await review.save();

            return {
                id: res.id,
                ...res._doc
            };
        }
    }
}
