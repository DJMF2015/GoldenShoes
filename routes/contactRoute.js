const express = require('express');
var Contact = require('../models/contact');
const { Router } = require('express');
const router = express.Router();

router.get('/submission', function (req, res) {

    Contact.find({}, function (err, contacts) {
        res.render("submissionPage", {
            contacts: contacts
        });
    });
});


//compose User contact page
router.get('/contact', function (req, res) {
    res.render("pages/contact");
});

router.post("/contact", function (req, res) {
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
router.get('/contact/delete/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.redirect('/submission');
    }
    else { console.log('Error in deleting contact details:' + err); }
  });
});


 
 




module.exports = router;