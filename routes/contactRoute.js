const express = require('express');
var Contact = require('../models/contact');
const router = express.Router();

router.get('/submission', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (!err) {
            res.render("submissionPage", {
                contacts: contacts

            });
        } else {

        }
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
//find one user contact
 
// delete a user contact from the db
router.get('/contact/delete/:id', function (req, res, next) {
    Contact.findByIdAndRemove({ _id: req.params.id }).then(function () {
         res.redirect('/submission');
    }).catch(next);
});
 
module.exports = router;