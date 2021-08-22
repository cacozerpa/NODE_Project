const {Router} = require('express');
const { createCar, deleteItem, getItem, updateItem } = require('../helpers/car');
const { isAuth } = require('../validations/auth');
const router = Router();

router.post('/additem/:id',  createCar);
router.get('/car', isAuth, function(req, res){
    console.log(req.session);
    res.status(200).send(req.session.car)
})
router.get('/caritem/:id', getItem);
router.put('/caritemupdate/:id', updateItem);
router.delete('/deleteitem/:id', isAuth, deleteItem);

module.exports = router;