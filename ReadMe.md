## GoldenShoes Exercise

#### Date: 06/09/20

### Problem: Golden Shoe facing declining revenues (in shop) as well as online. Online presence
needs to be improved by overhaul of website and social media channels.

![alt text](GoldenShoes.gif 'Golden Shoe')


### To Install & Run app locally -
- Clone repo : <code> git clone https://github.com/DJMF2015/GoldenShoes.git</code>
- Open up terminal & change directory to inside the downloaded repo project. Enter into console :<code>npm install --save</code>
- Enter <code>mongod</code> to run mongo daemon
- Finally, open a new tab (while mongod remains running) Type: <code>nodemon app.js</code>
- Open web-browser & turn to 'localhost://8080'

### Challenges:
● Declining revenue
● not mobile responsive
● Customer contact limited to phone support line only
● Website presently has ‘dated’ layout

### Design issues:
● accessibility,
● screen-size,
● appearance

### Functional issues:
● Non-mobile responsive;
● Flawed Returns process;
● Issue with ‘stock’ being flagged as ‘in-stock’ when is actually out-of-stock;
● Lack of ability to choose from shoe colour choice,
● Shoe style and shoe size,
● Social media presence unmonitored and customers appear to be able to ‘share’ from
every part of the website.
● Marketing Depart. sends out ‘vouchers’ by post of customers whose details they collect -
but can be used in-store’ only and not online.

### MVP:
1. Users should be able to view a list of all products in stock
2. User must be able to add, remove, update a product to their shopping ‘cart’
3. Users should be warned if an item is ‘out of stock’. Should be ‘clearly displayed’ and user able to rceive message when product is 'on stock'.
4. Users should be able to choose from a selection of shoe colours, sizes, styles.
5. Users should be able to checkout their items with the total amount correctly displayed.
6. Users must have the ability to ‘order/buy’ at checkout stage.
7. Users should be able to ‘filter’ a product by category
8. Should have a contact form for customer support and saved to the database.
9. Users’ social media should be limited to certain parts of a website only .

#### Additional Features (if time)
● Make website into a PWA (progessive web app)

 