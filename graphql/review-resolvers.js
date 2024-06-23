import Review from "../models/Review.js";
import Recipe from "../models/Recipe.js";
import Author from "../models/Author.js";

export const reviewResolvers = {
    Query: {
        // return a single Review by id
        async review(_, {id}) {
            return Review.findById(id);
        },
        // return a list of Reviews
        async reviews(_, {limit}) {
            return Review.find().sort({rating: -1}).limit(limit);
        },
    },
    // define how to return associations of a Review
    Review: {
        // return the associated Recipe object of the Review
        recipe: async (parent, args, context, info) => {
            const recipe = await Recipe.findById(parent.recipeId);
            if (!recipe) {
                throw new Error('Recipe not found');
            }

            return recipe;
        },
        // return the associated Author object of the Review
        author: async (parent, args, context, info) => {
            const author = await Author.findById(parent.authorId);
            if (!author) {
                throw new Error('Author not found');
            }

            return author;
        },
    },
    Mutation: {
        // insert a Review with its associations (Recipe & Author)
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
