const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//lets load a blog post or two here
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 
BlogPosts.create("Dear Diary", "You wont believe the day I had", "Mike", "March 25, 2018"); 

//lets define a get that returns blog posts
router.get('/', (req, res) => { 
	res.json(BlogPosts.get());
} );  

module.exports = router;