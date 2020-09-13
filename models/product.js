var mongoose = require('mongoose');
//PRODUCTS SCHEMA TEMP
const productSchema = {
    ID: Number,
    title: String,
    image: String,
    price: Number,
    type: String,
    description: String,
    stock: Number
}
const Product = mongoose.model("Product", productSchema);


 
module.exports = Product;

 