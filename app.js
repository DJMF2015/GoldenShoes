var express = require('express');
const app = express();

const port = 8080;
// app.use(bodyParser.urlencoded({extended: true}));

//set templating engine ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.send('hello there')
});

app.get('/products', function(req, res){
  res.render('#')
})










app.listen(port, function(){
   console.log("server is up and running at port " + port);
});

// module.exports = app;
