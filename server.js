//declare some of our node packages

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//import the Blog post model
const blogPostsRouter = require('./blogpostsRouter');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

app.use('/blog-posts', blogPostsRouter);

//list on port here

app.listen(process.env.PORT || 8080, () => { 

	console.log(`App is listening on port ${process.env.PORT || 8080}`);

});
