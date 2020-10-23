const port = 8080;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');
const ContactRouter = require('./routes/contactRoute.js');
const ProductRouter = require('./routes/productRoute.js');
 
const app = express();
 
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(expressSanitizer())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ContactRouter);
app.use(ProductRouter);

//setup and configure connection to mongodb driver & Mongoose ORM
mongoose.connect('mongodb://localhost/goldenshoeDB', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function () {
  console.log('successfully connected to DB...');
}).on('error', function (err) {
  console.log(err);
});
 
 

//HOME PAGE
app.get('/', function (req, res) {
  res.render('home');
});

// app.get('/index', function(req,res){
//   res.render('index')
// });

app.get('/home', function (req, res) {
  res.render('home');
});

// ERROR PAGE
app.use((req, res) => {
  res.status(404).send('<h1 style="color:blue; margin-top: 5em;"><center>Sorry, Page not found. Have you checked the correct URL ?<center></h1>');
});
 
// error handling middleware
app.use(function (err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`server is up and running at port: ${port}`);
  });

