const {Router} = require('express');
const router = Router();
const passport = require('passport');

const isLogged = require('../validations/auth');

router.post('/login', passport.authenticate('local') , async(req, res) => {
    res.status(200).send('User Login');
});

router.get('/logout', isLogged, (req, res) => {
    req.logout();
    res.status(200).send('Logged Out!');
})

module.exports = router;