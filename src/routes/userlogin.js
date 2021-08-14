const {Router} = require('express');
const router = Router();
const passport = require('passport');

const {isAuth, isLogged} = require('../validations/auth');

router.post('/login', isLogged, passport.authenticate('local') , async(req, res) => {
    req.session.car = [];
    role = req.user.role;
    if(role == 'ClIENT'){
    res.status(200).send(`User Logged in! As ${role}`);
    }else{
        res.status(201).send(`User Logged in! As ${role}`);
    }
    
});

router.get('/logout', isAuth, (req, res) => {
    req.logout();
    console.log('User Logged Out!')
    res.status(200).send('Logged Out!');
})

module.exports = router;