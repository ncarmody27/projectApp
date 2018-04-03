// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
//requires mongodb(defined in crud.js), url set there as well
var CRUD = require('./modules/crud.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('/api in use');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
		res.render('api.html',{message: 'to our API!'}); 
});
//Project api
router.post('/project', function (req, res) {
  CRUD.create('projects', req, res, true);
   res.redirect(`/${req.body.id}`); 
});

//Get all (http://localhost:8080/api/users)
router.get('/projects',function(req, res) {
	CRUD.readAll('projects',req,res, false);	
});

//Read by id (http://localhost:8080/api/user/:id)
router.get('/project/:_id', function(req, res){
	CRUD.readId('projects',req,res, false);
});

//update (accessed at POST http://localhost:8080/api/user/id)
router.post('/project/:_id',function(req, res) {
	CRUD.update('projects',req,res);
});

//delete user (accessed at DELETE http://localhost:8080/api/user/id)
router.delete('/project/:_id',function(req, res) {
	CRUD.del('projects',req,res);
});






// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
