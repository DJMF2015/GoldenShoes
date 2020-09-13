var mongoose = require('mongoose');
 

const contactSchema = {
    name: String,
    email: String,
    subject: String,
    comment: String
}
const Contact = mongoose.model("Contact", contactSchema);

 
module.exports = Contact;