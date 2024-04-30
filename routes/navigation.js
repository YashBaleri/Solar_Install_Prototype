const express = require('express');
const router = express.Router();

router
    .route("/homepage")
    .get(async (req, res) => {
        return res.render('homepage-user', { title: "Homepage", layout: 'main-user' });
    })

module.exports = router;