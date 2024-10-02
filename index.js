import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';  
import cors from 'cors';
import path from 'path'; // Import path module
import connectDB from './config/connectDB.js';
import schema from './schema/schema.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());

// Serve GraphQL API
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle requests for the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`.blue.bold.underline);
    console.log(`Click To Connect to http://localhost:${port}`.blue.bold.underline);
});

// Trial Server Working 
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
