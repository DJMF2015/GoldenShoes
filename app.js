var express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use('/public',express.static('public'));

var arrayDB = require('./public/DBdata.js');
const items = []


console.log(arrayDB);

app.get('/', function(req, res){
  res.send('you are on the HomePage')
});

app.get('/product/:type', function(req, res){
  const type = req.params.type;
  const tempArray = [];

	for(i=0;i<arrayDB.length;i++){
		if(type === arrayDB[i].type){
			tempArray.push(arrayDB[i]);
		}
	}
	res.send({products:tempArray});
});

app.get('/products', function(req, res){
  res.render('productsPage',{products: arrayDB});
});







app.listen(port, function(){
  console.log("server is up and running at port " + port);
});

// module.exports = app;
