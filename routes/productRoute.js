const paypal = require('paypal-rest-sdk');
const express = require('express');
var Product = require('../models/product');
const router = express.Router(); 

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AY0F0XILQ5SwMoi12aqI6SHEuniQ-tw5h5qTvUazhU0zDT7VthJrNw_ALJ2VGRobM0-mqAOvq5n_5b3v',
  'client_secret': 'EN779_vFT9Un8O3bVx1joX1OHmpz2_vlmz6SCZaUIdwnjLhNGKAvQSSg6MFBZB_nPBooE0bItFdkvo3L'
});

const prod1 = new Product({
  'ID': 1,
  'title': 'Brown Formal',
  'image': "formal.jpg",
  'price': 130,
  'type': 'Reds',
  'description': "These men’s Chelsea boots are the perfect smart casual style. As well as a heel loop tab and elastic panelling for easy on and off, a textile lining and sock offer breathability while a durable rubber sole makes for lasting comfort.",
  'stock': 15
});
const prod2 = new Product({
  'ID': 2,
  'title': 'Sports White',
  'image': 'sports.png',
  'price': 120,
  'type': 'Other',
  'description': "Lorem Ipsum is simply dummy text of the printing and",
  'stock': 10
});
const prod3 = new Product({
  'ID': 3,
  'title': 'Berry Brown',
  'image': 'sandal.jpg',
  'price': 80,
  'type': 'Reds',
  'description': "Taking inspiration from iconic archive styles this has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  'stock': 5
});
const prod4 = new Product({
  'ID': 4,
  'title': 'Red ',
  'image': 'mens_trainers.png',
  'price': 140,
  'type': 'Greens',
  'description': "Encapsulating the Athleisure trend, Triken Jump is crafted using the strobel construction method – one that’s popular for sports shoes thanks to the resulting flexibility.",
  'stock': 14
});
const prod5 = new Product({
  'ID': 5,
  'title': 'Party Pink!',
  'image': 'pink_kids.png',
  'price': 140,
  'type': 'Other',
  'description': "Our City kids collection delivers premium cupsole profiles for kids that stay fun, durable, crafted and on-trend. Perfect for active feet, City Flake features a pink leather upper with retro star detailing, plus a padded collar for ankle support. ",
  'stock': 5
});
const prod6 = new Product({
  'ID': 6,
  'title': 'School',
  'image': 'boys_school.png',
  'price': 60,
  'type': 'Reds',
  'description': "Taking inspiration from iconic archive styles this key chunky profile creates the perfect school shoe. A smart upper in durable black leather sits on an oversized, flexible rubber outsole, while the lace-up fastening stays classic.",
  'stock': 7
});
const prod7 = new Product({
  'ID': 7,
  'title': ' White Deluxe',
  'image': 'womens_trainers.png',
  'price': 70,
  'type': 'Greens',
  'description': "With rugged appeal, these men's boots take on the classic boot profile.",
  'stock': 20
});
const prod8 = new Product({
  'ID': 8,
  'title': 'Leather Premium',
  'image': 'leather_boots.png',
  'price': 110,
  'type': 'Other',
  'description': "Crafted from premium sand suede and boasting a minimalist aesthetic with stitched detailing, these men’s Chelsea boots are the perfect smart casual style. As well as a heel loop tab and elastic panelling for easy on and off, a textile lining and sock offer breathability while a durable rubber sole makes for lasting comfort. ",
  'stock': 8
});
const prod9 = new Product({
  'ID': 9,
  'title': 'Formal Plain',
  'image': 'formal.jpg',
  'price': 140,
  'type': 'Greens',
  'description': "Perfect for city adventures, these luxe leather lace-ups from our Unstructured collection offer an athletic look with the black upper and contrasting sole made from EVA and rubber for a lightweight and flexible feel.",
  'stock': 10
});
const prod10 = new Product({
  'ID': 10,
  'title': 'Womens Slippers ',
  'image': 'womens_slippers.png',
  'price': 95,
  'type': 'Others',
  'description': "Perfect for city adventures, these luxe leather lace-ups from our Unstructured collection offer an athletic look with the black upper and contrasting sole made from EVA and rubber for a lightweight and flexible feel.",
  'stock': 20
});
const prod11 = new Product({
  'ID': 11,
  'title': 'Womens Blue',
  'image': 'womensblue.jpg',
  'price': 110,
  'type': 'Others',
  'description': "Perfect for city adventures, these luxe leather lace-ups from our Unstructured collection offer an athleisure look with the snake upper and contrasting sole made from EVA and rubber for a lightweight and flexible feel. ",
  'stock': 22
});




const defaultItems = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11];

// find item and insert

router.get("/", function (req, res) {

  Product.find({}, function (err, foundItems) {
    var cookieValues = req.cookies;
    if (foundItems.length === 0) {

      Product.insertMany(defaultItems, function (err) {
        if (err) { 
          console.log(err);
        } else  {
       
          console.log("Sucessfully saved default product values");
        }
      });
      res.redirect('/');
    } else {
      res.render("productsPage", {products: foundItems, cartNumb: cookieValues });
    }
  });
});

 
//SHOP MAIN PAGE
router.get('/shop', function (req, res) {

  Product.find({}, function (err, items) {
    res.render("pages/shop", {
      items: items
    });
  });
});


//VIEW 1 SINGLE ITEM items/
router.get("/singleItem/:id", function (req, res) {

  const requestedPostId = req.params.id;

  Product.find({ _id: requestedPostId }, function (err, items) {
    res.render("pages/singleItem", {
      items: items
    })
  });
});


//DELETE ITEM IN SHOP
router.get('/shop/delete/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, function (err, response) {
    if (err) console.log("Error in deleting record id " + req.params.id);
    else res.redirect('/shop');
    console.log("Person with id " + req.params.id + " removed.");
  });
});


//ALL PRODUCTS
router.get('/products', function (req, res) {
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);

  if (cookieCart) {
    var cookieArray = JSON.parse(cookieCart);
  } else {
    var cookieArray = [];
  }
  res.render('productsPage', { products: defaultItems, cartNumb: cookieArray.length });
});

//GET 1 PRODUCT
router.get('/products/:ID', function (req, res) {
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);
  var ID = req.sanitize(req.params.ID);

  if (cookieCart) {
    var cookieArray = JSON.parse(cookieCart);
  } else {
    var cookieArray = [];
  }

  for (i = 0; i < defaultItems.length; i++) {
    if (ID == defaultItems[i].ID) {
      res.render('listingPage', { listing: defaultItems[i], cartNumb: cookieArray.length });
    }
  }

});

//  BUY BUTTON
router.get('/buyNow/:ID', function (req, res) {
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);
  var ID = req.sanitize(req.params.ID);

  if (!cookieCart) {
    //array to store items
    var cookieArray = [];
    cookieArray.push(ID);
    var cookieStringArray = JSON.stringify(cookieArray);
  } else {
    var cookieStringArray = cookieCart;
    var cookieArray = JSON.parse(cookieStringArray);
    cookieArray.push(ID);
    cookieStringArray = JSON.stringify(cookieArray);
    res.clearCookie('cart');
  }

  res.cookie('cart', cookieStringArray);
  res.redirect('../cart');
});


// put request for stock level To-Do

//CART CHECKOUT AND TOTAL
router.get('/cart', function (req, res) {
  // res.clearCookie(req.cookies)
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);

  if (cookieCart) {
    var cookieArray = JSON.parse(cookieCart);
    cookieArray.sort();

    var tempCartArray = [];

    for (var i = 0; i < cookieArray.length; i++) {
      for (var c = 0; c < defaultItems.length; c++) {
        if (cookieArray[i] == defaultItems[c].ID) {
          tempCartArray.push(defaultItems[c]);
        }
      }
    }
    //Add price to previous TOTAL
    var cartTotal = 0;
    for (var i = 0; i < tempCartArray.length; i++) {
      cartTotal = cartTotal + tempCartArray[i].price;

    }
  } else {
    var cartTotal = 0;
    var tempCartArray = [];
    var cookieArray = [];
  }

  res.render('cartPage', { cart: cookieCart, cartNumb: cookieArray.length, cartValues: tempCartArray, total: cartTotal });
});


//AJAX products route
router.get('/product/:type', function (req, res) {
  var type = req.sanitize(req.params.type);
  var tempArray = [];

  for (i = 0; i < defaultItems.length; i++) {
    if (type === defaultItems[i].type) {
      tempArray.push(defaultItems[i]);
    }
  }

  res.send({ products: tempArray });
});


// ADD TO CART
router.get('/addCart/:ID', function (req, res) {
  var ID = req.sanitize(req.params.ID);
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);

  if (!cookieCart) {
    var cookieArray = [];
    cookieArray.push(ID);
    var cookieStringArray = JSON.stringify(cookieArray);

    res.cookie('cart', cookieStringArray);
    res.send({ cartNumb: 1 });
  } else {
    var cartValue = cookieCart;
    var cookieArray = JSON.parse(cartValue);
    cookieArray.push(ID);
    var cookieStringArray = JSON.stringify(cookieArray);

    res.clearCookie('cart');
    res.cookie('cart', cookieStringArray);
    res.send({ cartNumb: cookieArray.length });
  }
});

//REMOVE 1 ITEM FROM CART
router.get('/removeCart/:ID', function (req, res, err) {
  var cookieValue = req.cookies;
  var cookieCart = req.sanitize(cookieValue.cart);
  var cookieArray = JSON.parse(cookieCart);
  var IDremove = req.sanitize(req.params.ID);

  for (var i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i] == IDremove) {
      cookieArray.splice(i, 1);
      break;
    }
  }

  var stringArray = JSON.stringify(cookieArray);
  res.clearCookie('cart');
  res.cookie('cart', stringArray);
  // res.render('../productsPage', { cart: cookieCart, cartNumb: cookieArray.length});
  res.redirect('/products');
});



router.post('/chargePaypal', function (req, res) {
  var items = req.sanitize(req.body.description);
  items = JSON.parse(items);
  //shipping tax (£5.00)
  var chargeAmount = 5;

  for (var i = 0; i < items.length; i++) {
    for (var count = 0; count < defaultItems.length; count++) {
      if (items[i] == defaultItems[count].ID) {
        chargeAmount = chargeAmount + defaultItems[count].price;
      }
    }
  }

  var create_payment_json = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'paypal'
    },
    'redirect_urls': {
      'return_url': `https://localhost:8080/success?price=${chargeAmount}&description=${items}`,
      'cancel_url': 'https://localhost:8080/cancel'
    },
    'transactions': [{
      'item_list': {
        'items': [{
          'name': 'GoldenShoes Sale',
          'sku': `${items}`,
          'price': `${chargeAmount}`,
          'currency': 'USD',
          'quantity': 1
        }]
      },
      'amount': {
        'currency': 'USD',
        'total': `${chargeAmount}`
      },
      'description': 'Sale of shoes(s)'
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.send('an error has occured');
      throw error;
    } else {
      for (var i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });

});

module.exports = router;
