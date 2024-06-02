import Recipe from "../models/Recipe.js";

export const resolvers = {
    Query: {
        async recipe(_, {ID}) {
            return Recipe.findById(ID);
        },
        async getRecipes(_, {limit}) {
            return Recipe.find().sort({createdAt: -1}).limit(limit);
        }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name, description}}, context) {
            const createdRecipe = new Recipe({
                name,
                description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });

            const res = await createdRecipe.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_, {ID}) {
            // 1 if something was deleted, 0 if nothing was deleted
            return (await Recipe.deleteOne({_id: ID})).deletedCount;
        },
        async editRecipe(_, {ID, recipeInput: {name, description}}) {
            // 1 if something was edited, 0 if nothing was edited
            return (await Recipe.updateOne({_id: ID}, {name, description})).modifiedCount;
        }
    }
}
