const express = require('express');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.post('/favorite', verify, (req, res) => {
})
router.delete('/favorite', (req, res) => {
})

module.exports = router;