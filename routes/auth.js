const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const database = firebase.database();

router
    .route("/register")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.type === "user") {
            return res.redirect('/navigation/homepage');
        }
        else {
            return res.render('register-user', { title: "User Registration", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {

            firebase
                .auth()
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((data) => {
                    const user = data.user;
                    let databaseRef = database.ref();

                    let userData = req.body;
                    delete userData.password;
                    userData.type = "user"

                    databaseRef.child('users/' + user.uid).set(userData);
                    return res.redirect('/login');
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
    .route("/")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.type === "user") {
            return res.redirect('/navigation/homepage');
        }
        else {
            return res.render('landing', { title: "Solar", layout: 'main-login-register' });
        }
    });

router
    .route("/admin/homepage")
    .get(async (req, res) => {
        return res.render('homepage-admin', { title: "Admin", layout: 'main-admin' });
    })

router
    .route("/admin/create-sales")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.type === "admin") {
            return res.render('register-sales', { title: "Admin", layout: 'main-login-register' });
        }
        else {
            return res.render('login-admin', { title: "Admin", layout: 'main-login-register' });
        }
    })

router
    .route("/admin/create-construction")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.type === "admin") {
            return res.render('register-construction', { title: "Admin", layout: 'main-login-register' });
        }
        else {
            return res.render('login-admin', { title: "Admin", layout: 'main-login-register' });
        }
    })

router
    .route("/admin/create/sales")
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((data) => {
                    const user = data.user;
                    let databaseRef = database.ref();

                    let userData = req.body;
                    delete userData.password;
                    userData.type = "sales"

                    databaseRef.child('/sales/' + user.uid).set(userData);
                    return res.redirect('/admin/homepage');
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
    .route("/admin/create/construction")
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((data) => {
                    const user = data.user;
                    let databaseRef = database.ref();

                    let userData = req.body;
                    delete userData.password;
                    userData.type = "construction"

                    databaseRef.child('/construction/' + user.uid).set(userData);
                    return res.redirect('/admin/homepage');
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
    .route("/admin/create")
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((data) => {
                    const user = data.user;
                    let databaseRef = database.ref();
                    if (req.body.type === "construction") {

                        let userData = req.body;
                        delete userData.password;
                        userData.type = "construction"

                        databaseRef.child('/construction/' + user.uid).set(userData);
                        return res.redirect('/admin/homepage');
                    } else if (req.body.type === "sales") {

                        let userData = req.body;
                        delete userData.password;
                        userData.type = "sales"

                        databaseRef.child('/sales/' + user.uid).set(userData);
                        return res.redirect('/admin/homepage');
                    }
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
    .route("/admin/login")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.type === "admin") {
            return res.redirect('/admin/homepage');
        }
        else {
            return res.render('login-admin', { title: "Log-in", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {

            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(async (user) => {
                    console.log("here");
                    const eventref = database.ref('admin');
                    const snapshot = await eventref.once('value');
                    const value = snapshot.val();
                    const currentUserData = value[user.user.uid];
                    console.log(currentUserData)
                    if (!currentUserData) return res.redirect('/admin/login');
                    if (currentUserData && currentUserData.type !== "admin") return res.redirect('/admin/login');

                    req.session.user = { _id: user.user.uid, type: "admin" };
                    return res.redirect('/admin/homepage');


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
    .route("/login")
    .get(async (req, res) => {
        if (req.session.user) {
            if (req.session.user.type === "user") return res.redirect('/navigation/homepage');
            if (req.session.user.type === "construction") return res.redirect('/employee/construction/homepage');
            if (req.session.user.type === "sales") return res.redirect('/employee/sales/homepage');
            if (req.session.user.type === "admin") return res.redirect('/admin/homepage');
        }
        else {
            return res.render('login-user', { title: "Log-in", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {

            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(async (user) => {

                    const eventref = database.ref('users');
                    const snapshot = await eventref.once('value');
                    const value = snapshot.val();
                    const currentUserData = value[user.user.uid];
                    if (!currentUserData) return res.redirect('/login');
                    if (currentUserData && currentUserData.type !== "user") return res.redirect('/login');

                    req.session.user = { _id: user.user.uid, type: "user" };
                    return res.redirect('/navigation/homepage');


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
    .route('/logout')
    .get(async (req, res) => {
        req.session.destroy()
        return res.redirect('/');
    });


module.exports = router;