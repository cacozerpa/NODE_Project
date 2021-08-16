const {Router} = require('express');
const { createCar, deleteItem } = require('../helpers/car');
const { isAuth } = require('../validations/auth');
const router = Router();

router.post('/additem/:id',  createCar);
router.get('/car', isAuth, function(req, res){
    console.log(req.session);
    res.status(200).send(req.session.car)
})
router.delete('/deleteitem/:id', isAuth, deleteItem);

module.exports = router;