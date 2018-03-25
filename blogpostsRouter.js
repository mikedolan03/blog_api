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

//add a blog post
router.post('/', jsonParser, (req, res) => { 
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body))
		{
			const message = `Missing \`${field}\` in request body `;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
} ); 

//delete a blog post - take blog id

router.delete('/:id', jsonParser, (req, res) => { 
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.ID}\``);
	res.status(204).end();

} );


module.exports = router;