const express = require('express');
const expressGraphQL = require('express-graphql');
const Schema = require('./graphql/Schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: Schema,
    graphiql: true
}));


app.listen(3000, () => {
    console.log('Server running');
});