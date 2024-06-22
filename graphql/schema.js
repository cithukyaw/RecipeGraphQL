import { gql } from 'apollo-server';

const typeDefs = gql`
# type definitions for Query & Mutation
type Recipe {
    id: ID!
    name: String!
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
    reviews: [Review!] # all reviews of the recipe
}

type Review {
    id: ID!
    rating: Int!
    content: String
    recipe: Recipe! # the related recipe of the review
    author: Author! # the related author of the review
}

type Author {
    id: ID!
    name: String!
    reviews: [Review!] # all reviews of the author
}

# input definitions for Mutation
input RecipeInput {
    name: String!
    description: String
}

input AuthorInput {
    name: String!
}

input ReviewInput {
    rating: Int!
    content: String
    recipeId: ID!
    authorId: ID!
}

# query & mutation definitions
type Query {
    # Recipe
    recipe(id: ID!): Recipe          # single recipe query
    recipes(limit: Int): [Recipe]    # recipe list query
    # Review
    review(id: ID!): Review          # single review query
    reviews(limit: Int): [Review]    # review list query
    # Author
    author(id: ID!): Author          # single author query
    authors(limit: Int): [Author]    # author list query
}

type Mutation {
    # Recipe
    createRecipe(input: RecipeInput): Recipe!           # endpoint to create a recipe
    deleteRecipe(id: ID!): Boolean                      # endpoint to delete a recipe
    editRecipe(id: ID!, input: RecipeInput): Boolean    # endpoint to edit a recipe
    # Review
    createReview(input: ReviewInput): Review!           # endpoint to create a review
    deleteReview(id: ID!): Boolean                      # endpoint to delete a review
    # Author
    createAuthor(input: AuthorInput): Author!           # endpoint to create a author
}
`

export default typeDefs;
