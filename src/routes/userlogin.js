const {Router} = require('express');
const router = Router();
const passport = require('passport');

const {isAuth} = require('../validations/auth');

router.post('/login', passport.authenticate('local') , async(req, res) => {
    res.status(200).send('User Logged in!');
});

router.get('/logout', isAuth, (req, res) => {
    req.logout();
    res.status(200).send('Logged Out!');
})

module.exports = router;