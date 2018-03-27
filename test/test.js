const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('BlogPosts', function() {

	before(function() {
		return runServer();
	});

	after(function() {
	 return closeServer();

	});

	it('should give a list of Blog posts on GET', function () {

	return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
		});

	});

	//post

  	it('should post a new blog post on POST', function() {
  		//const requiredFields = ['title', 'content', 'author', 'publishDate'];
	    const newBlogPost = {title:'Korean BBQ Visit', content: 'Our trip of Korean bbq was great! So much meat! Soju was also good', author: 'Mike', publishDate: 'Aug, 24, 1990'}; 
	    return chai.request(app)
	      .post('/blog-posts')
	      .send(newBlogPost)
	      .then( function(res) {
	        expect(res).to.have.status(201);
	        expect(res).to.be.json;
	        expect(res.body).to.be.a('object');
	        expect(res.body).to.include.keys('title', 'content', 'author', 'publishDate');
	        expect(res.body.id).to.not.equal(null);

	        expect(res.body).to.deep.equal(Object.assign(newBlogPost, {id: res.body.id}));
      })
  	} );


  	//delete blog post
  	it('should delete a blog post on DELETE', function() { 

  		return chai.request(app)
  			.get('/blog-posts')
  			.then(function(res) { 
  				return chai.request(app)
  					.delete(`/blog-posts/${res.body[0].id}`);
  			})
  			.then(function(res) {
  				expect(res).to.have.status(204);
  			});

  	});


  	it('should edit a blog post on PUT', function() {

  		//updates
  		const unpdatedPost = {title:'Korean BBQ Restaurant Review', content: 'Our trip of Korean bbq was great! Soju was also good', author: 'Mike', publishDate: 'Aug, 24, 2000'}; 

  		return chai.request(app)
  			.get('/blog-posts')
  			.then(function(res) { 
  				//grab the id from the res and add it to the update var
  				//since we need a legit id
  				unpdatedPost.id = res.body[0].id;

  				return chai.request(app)
  				.put(`/blog-posts/${unpdatedPost.id}`)
  				.send(unpdatedPost)
  			})
  			.then(function(res) { 
  				expect(res).to.have.status(204);
  				return chai.request(app)
  					.get('/blog-posts')
  					expect(res.body[0]).to.deep.equal(unpdatedPost);
  			} );

  	});


});