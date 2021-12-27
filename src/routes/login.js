const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

router.post('/login', async (req, res) => {

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Chequear si el email si esta registrado
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Email is not registered.");

    // Password match
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Invalid password.");

    res.send("Logged in!");
});
module.exports = router;