import Author from "../models/Author.js";
import Recipe from "../models/Recipe.js";

export const authorResolvers = {
    Query: {
        async author(_, {id}) {
            return Author.findById(id);
        },
        async authors(_, {limit}) {
            limit = limit || 10;
            return Author.find().sort({createdAt: -1}).limit(limit);
        }
    },
    Mutation: {
        async createAuthor(_, {input: {name}}, context) {
            const createdAuthor = new Author({
                name
            });

            const res = await createdAuthor.save();

            return {
                id: res.id,
                ...res._doc
            };
        }
    }
}
