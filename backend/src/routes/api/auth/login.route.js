const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Login get' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Login post under development' });

})

module.exports = router;