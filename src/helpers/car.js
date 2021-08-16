const pool = require('../utils/pool');
const db = require('../utils/pool');
const queries = require('../utils/queries');

const createCar = async (req, res) => {
    try{
        await pool.query('BEGIN');
        car = req.session.car;
        const id = req.params.id;
        const qty = 1;
        const product = await pool.query(queries.GET_PRODUCTBYID, [id]);
        if(product.rows != ''){
            console.log('Product Found!');

            const itemIndex = car.findIndex((element, itemIndex) => {
                console.log(element.id)
                if (element.id === product.rows[0].id) {
                  return element.id;
                }
              });
              
              if(itemIndex == -1){ 
                console.log(req.session);
                
                car.push({id: product.rows[0].id, name: product.rows[0].name, price: product.rows[0].price, qty: qty});
                req.session.car = car;
    
                res.status(200).send(req.session.car);
              }else{
                  const item = car[itemIndex];
                  item.qty = item.qty + 1;
                  car[itemIndex] = item;
                  console.log(car[itemIndex])
                  res.status(200).send(car[itemIndex]);
              }
            
        }else{
            console.log(`Product not found ${id}!`);
            res.status(400).send('Product Not Found!');
        }
    }catch(err){
        res.status(500).send('Server Error!');
        throw err; 
    }
}

const deleteItem = async (req, res) => {
    const id = req.params.id;
    try{
        await db.query('BEGIN');
        const checkId = await db.query(queries.CHECKPRODUCTID, [id]);

        if(checkId.rows != ''){
            console.log('Product Found!');
            
            car = req.session.car;
            const itemIndex = car.findIndex((element, itemIndex) => {
                console.log(element.id)
                if (element.id === checkId.rows[0].id) {
                  return element.id;
                }
              });

            console.log("el index: " + itemIndex);
            
            if(itemIndex != -1){
                const item = car[itemIndex];
                if(item.qty === 1 ){
            car.splice(itemIndex, 1);
            res.status(200).send('Product Deleted!')
        }else{
            item.qty = item.qty - 1;
            car[itemIndex] = item;
            res.status(200).send(car[itemIndex]);
        }

        }else{
            console.log(`Item not found!`);
            res.status(400).send('Item not found!')
        }
    }else{
        console.log('Product not found!')
        res.status(400).send(`Product not Found  ${checkId.rows[0].product_name}, ${id}`)
    }
    }catch(err){
        res.status(500).send("el error" + err)
        throw err;
    }
}

module.exports = {
    createCar,
    deleteItem
}