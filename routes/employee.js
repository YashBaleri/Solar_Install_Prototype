const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const database = firebase.database();

router
    .route("/construction/homepage")
    .get(async (req, res) => {
        return res.render('homepage-construction', { title: "Construction Team", layout: 'main-construction' });
    })


router
    .route("/sales/homepage")
    .get(async (req, res) => {
        return res.render('homepage-sales', { title: "Sales Team", layout: 'main-sales' });
    })

router
    .route("/construction/login")
    .get(async (req, res) => {
        if (req.session.user) {
            if (req.session.user.type === "user") return res.redirect('/navigation/homepage');
            if (req.session.user.type === "construction") return res.redirect('/employee/construction/homepage');
            if (req.session.user.type === "sales") return res.redirect('/employee/sales/homepage');
            if (req.session.user.type === "admin") return res.redirect('/admin/homepage');
        }
        else {
            return res.render('login-construction', { title: "Log-in", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(async (user) => {

                    const eventref = database.ref('construction');
                    const snapshot = await eventref.once('value');
                    const value = snapshot.val();
                    const currentUserData = value[user.user.uid];
                    if (!currentUserData) return res.redirect('/construction/login');
                    if (currentUserData && currentUserData.type !== "auth") return res.redirect('/construction/login');

                    req.session.user = { _id: user.user.uid, type: "construction" };
                    return res.redirect('/employee/construction/homepage');
                })
                .catch(function (error) {
                    console.log(error);
                    return res.json({ error: error });
                });

        }
        catch (e) {
            console.log('No good', e);
            res.redirect('/');
        }
    });

router
    .route("/sales/login")
    .get(async (req, res) => {
        if (req.session.user) {
            if (req.session.user.type === "user") return res.redirect('/navigation/homepage');
            if (req.session.user.type === "construction") return res.redirect('/employee/construction/homepage');
            if (req.session.user.type === "sales") return res.redirect('/employee/sales/homepage');
            if (req.session.user.type === "admin") return res.redirect('/admin/homepage');
        }
        else {
            return res.render('login-sales', { title: "Log-in", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(async (user) => {

                    const eventref = database.ref('sales');
                    const snapshot = await eventref.once('value');
                    const value = snapshot.val();
                    const currentUserData = value[user.user.uid];
                    if (!currentUserData) return res.redirect('/sales/login');
                    if (currentUserData && currentUserData.type !== "sales") return res.redirect('/sales/login');

                    req.session.user = { _id: user.user.uid, type: "sales" };
                    return res.redirect('/employee/sales/homepage');
                })
                .catch(function (error) {
                    console.log(error);
                    return res.json({ error: error });
                });

        }
        catch (e) {
            console.log('No good', e);
            res.redirect('/');
        }
    });

module.exports = router;