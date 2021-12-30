const express = require('express');
const router = express.Router();
const verify = require('../auth/verifyToken');
const User = require('../models/User');

router.get('/favorite', async (req, res) => {

});


router.post('/favorite', async (req, res) => {
    const charId = req.body.charId;
    const user = await User.findById(req.body.userFrom);
    // console.log(user)
    // console.log("Is it in user favorites? ", user.favorites.filter(x => x.charId === charId))
    if ((user.favorites.filter(x => x.charId === charId).length) === 0){
        // console.log("Character added to user favorites")
        user.favorites.push({charId:charId,fav:true});
    } else {
        // console.log("Character already in user favorites!")
        // console.log(user.favorites)
    }
    user.save()

    res.status(200).json({ success:true });
});


router.delete('/favorite', async (req, res) => {
    const charId = req.body.charId;
    const user = await User.findById(req.body.userFrom);
    // console.log(user)
    // console.log("Is it in user favorites? ", user.favorites.filter(obj => obj.charId === charId))
    if ((user.favorites.filter(obj => obj.charId === charId).length) !== 0){
        // console.log("Character removed from user favorites")
        user.favorites = user.favorites.filter(obj => obj.charId !== charId);
    } else {
        // console.log("Character already not in user favorites!")
        // console.log(user.favorites)
    }
    user.save()

    res.status(200)

})

module.exports = router;