const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {

    // Chequear que no este registrado el mismo email en db
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("Email has already been registered.");


    // Crear nuevo usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;