import { gql } from 'apollo-server';

const typeDefs = gql`
type Recipe {
    name: String,
    description: String,
    createdAt: String,
    thumbsUp: Int
}

input RecipeInput {
    name: String
    description: String
}

input EditRecipeInput {
    name: String
}

type Query {
    recipes(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
}

type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, editRecipeInput: EditRecipeInput): Recipe!
}
`

export default typeDefs;
