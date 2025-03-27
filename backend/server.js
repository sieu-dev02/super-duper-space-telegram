require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,  
  playground: true      
});

server.listen({ port: process.env.PORT || 4000, host: '0.0.0.0' }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
