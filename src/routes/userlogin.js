const {Router} = require('express');
const router = Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local') , async(req, res) => {
    res.status(200).send('User Login');
});

module.exports = router;