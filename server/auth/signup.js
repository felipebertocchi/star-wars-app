const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

router.post('/signup', async (req, res) => {

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Chequear que no este registrado el mismo email en db
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send("Email has already been registered.");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Crear nuevo usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;