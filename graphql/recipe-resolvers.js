import Recipe from "../models/Recipe.js";

export const recipeResolvers = {
    Query: {
        async recipe(_, {id}) {
            return Recipe.findById(id);
        },
        async recipes(_, {limit}) {
            limit = limit || 10;
            return Recipe.find().sort({createdAt: -1}).limit(limit);
        }
    },
    Mutation: {
        async createRecipe(_, {input: {name, description}}, context) {
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
        async deleteRecipe(_, {id}) {
            // 1 if something was deleted, 0 if nothing was deleted
            return (await Recipe.deleteOne({_id: id})).deletedCount;
        },
        async editRecipe(_, {id, input: {name, description}}) {
            // 1 if something was edited, 0 if nothing was edited
            return (await Recipe.updateOne({_id: id}, {name, description})).modifiedCount;
        }
    }
}
