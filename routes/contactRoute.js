const express = require('express');
let Contact = require('../models/contact');
const router = express.Router();

// ADD Show All Route
router.get('/submission', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (!err) {
            res.render("submissionPage", {
                contacts: contacts
            });
        } else {
            console.log(err)
        }
    });
});

// Load Contact Form
router.get('/contact', function (req, res) {
    res.render("pages/contact");
});

// ADD Submit POST Route
router.post("/contact", function (req, res) {
    var contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        comment: req.body.comment
    });

    //SAVE USER contact into mongodb
    contact.save(function (err) {
        if (!err) {
            res.redirect("/submission")
        }
    });
});

// Load Edit Form for Single Contact
router.get('/contact/:id', function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err) {
            console.log("not authorised");
            return res.redirect('/');
        }
        res.render('pages/edit', {
            contact: contact
        });
    });
});
// Update Submit POST Route
// router.post('contact/:id', function (req, res ) {
//     let contact = {};
//     contact.name = req.body.name;
//     contact.email = req.body.email;
//     contact.subject = req.body.subject;
//     contact.comment = req.body.comment;

//     let query = { _id: req.params.id }

//     Contact.update(query, contact, function (err) {
//         res.redirect('/submission');
//     }) ;
// });

//UPDATE CONTACT
router.post('/contact/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if (err) res.json({ message: "Error in updating contact with id " + req.params.id });
        res.redirect('/submission')
    })
});

// DELETE CONTACT 
router.get('/contact/delete/:id', function (req, res, next) {
    Contact.findByIdAndRemove({ _id: req.params.id }).then(function () {
        res.redirect('/submission');
    }).catch(next);
});



module.exports = router;