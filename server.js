//declare some of our node packages

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//import the Blog post model
const blogPostsRouter = require('./blogpostsRouter');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

//so that we see something on heroku - serve an html page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/blog-posts', blogPostsRouter);

//list on port here

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => { 
		server = app.listen(port, () => {
			console.log(`App is listening on port ${port}`);
			resolve(server);	
		}).on('error', err => {
			reject(err);
		});
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if(err) {
				reject(err);
				return;
			}
		resolve();
		});
	});
}


if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
