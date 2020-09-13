 
const mongoose = require('mongoose')
const express = require('express');
var Contact = require('../models/contact');
const app = express();


app.get('/submission', function (req, res) {

    Contact.find({}, function (err, contacts) {
        res.render("submissionPage", {
            contacts: contacts
        });
    });
});


//compose User contact page
app.get('/contact', function (req, res) {
    res.render("pages/contact");
});

app.post("/contact", function (req, res) {
    var contact = new Contact({
        name: req.body.postName,
        email: req.body.postEmail,
        subject: req.body.postSubject,
        comment: req.body.postComment
    });

    //save users contact details
    contact.save(function (err) {
        if (!err) {
            res.redirect("/submission")
        }
    });
});

//DELETE A USERS'S CONTACT
app.get('/contact/delete/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.redirect('/submission');
    }
    else { console.log('Error in deleting contact details:' + err); }
  });
});



// app.get('/contact/update/:id', (req, res) => {
//   // Contact.findOneAndUpdate(req.body.id,  (err) => {
//     Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err ) => {
//     if (!err) {
//       res.render("pages/contact", {
//         name: req.body.postName,
//         email: req.body.postEmail,
//         subject: req.body.postSubject,
//         comment: req.body.postComment
//       });
//     }
//     else { console.log('Error in deleting contact details:' + err); }
//   });
// });

// app.put('/contact/update/:id, function (req, res) {
//   Person.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
//     if (err) console.log(("Error in updating person with id " + req.params.id ));
//     res.json(response);
//   });
// });




module.exports = app;