import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./graphql/schema.js";
import {recipeResolvers} from "./graphql/recipe-resolvers.js";
import {authorResolvers} from "./graphql/author-resolvers.js";
import {reviewResolvers} from "./graphql/review-resolvers.js";

const MONGODB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@atlascluster.itmuksy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries / mutations
const server = new ApolloServer({
    typeDefs,
    resolvers: [
        recipeResolvers,
        authorResolvers,
        reviewResolvers
    ]
});

mongoose.connect(MONGODB)
    .then(() => {
        console.log('MongoDB connection successful');
        return server.listen({port: process.env.PORT})
    })
    .then((res) => {
        console.log(`Serve running at ${res.url}`);
    });
