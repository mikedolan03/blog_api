//declare some of our node packages

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//import the Blog post model
const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

//lets load a blog post or two here
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 

//lets define a get that returns blog posts
app.get('/blog-post', (req, res) => { 
	res.json(BlogPosts.get());
} ); 

//list on port here

app.listen(process.env.PORT || 8080, () => { 

	console.log(`App is listening on port ${process.env.PORT || 8080}`);

});
