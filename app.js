const port = 8080;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const expressSanitizer = require('express-sanitizer');
const ContactRouter = require('./routes/contactRoute.js');
const ProductRouter = require('./routes/productRoute.js');  
const OrdersRouter = require('./routes/ordersRoute.js');  

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(expressSanitizer())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ContactRouter);
app.use(ProductRouter);
app.use(OrdersRouter);
// const stripe = require('stripe')(stripeSecretKey)
//setup and establish connection to mongodb client and mongoose orm
mongoose.connect('mongodb://localhost/goldenshoeDB', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', function () {
  console.log('successfully connected to DB...');
}).on('error', function (err) {
  console.log(err);
});



//HOME PAGE
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/home', function (req, res) {
  res.render('home');
});

// app.get('/store', function (req, res) {
//   fs.readFile('items.json', function (error, data) {
//     if (error) {
//       res.status(500).end()
//     } else {
//       res.render('store.ejs', {
//         stripePublicKey: stripePublicKey,
//         items: JSON.parse(data)
//       })
//     }
//   })
// })

// app.post('/purchase', function (req, res) {
//   fs.readFile('items.json', function (error, data) {
//     if (error) {
//       res.status(500).end()
//     } else {
//       const itemsJson = JSON.parse(data)
//       const itemsArray = itemsJson.music.concat(itemsJson.merch)
//       let total = 0
//       req.body.items.forEach(function (item) {
//         const itemJson = itemsArray.find(function (i) {
//           return i.id == item.id
//         })
//         total = total + itemJson.price * item.quantity
//       })

//       stripe.charges.create({
//         amount: total,
//         source: req.body.stripeTokenId,
//         currency: 'usd'
//       }).then(function () {
//         console.log('Charge Successful')
//         res.json({ message: 'Successfully purchased items' })
//       }).catch(function () {
//         console.log('Charge Fail')
//         res.status(500).end()
//       })
//     }
//   })
// })
// ERROR PAGE
app.use((req, res) => {
  res.status(404).send('<h1>Sorry, Page not found. Have you checked the correct URL ?');
});



app.listen(port, function () {
  console.log("server is up and running at port " + port)
});
