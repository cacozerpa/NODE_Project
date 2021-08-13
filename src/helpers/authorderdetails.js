const pool = require('../utils/pool');
const queries = require('../utils/queries');
const order = require('../helpers/authorder');

const createOrderDetail = async (req, res) => {
    const user = req.user;
    const {total} = req.body;
    car = req.session.car;
    data = await order.createOrder(user, total);
    orderId = data.id;

    for(var i = 0; i < car.length; i++){
         prod_id = car[i].id
         qty = car[i].qty;
         try{
            await pool.query('BEGIN');
            const order = await pool.query(queries.GET_ORDERBYID, [orderId]);
    
            if(order.rows != ''){
                const response = await pool.query(queries.CREATE_ORDERDETAILS, [orderId, qty, prod_id]);
                console.log(response.rows);
                
                await pool.query('COMMIT');
            }else{
                console.log(`Order ${id} doesnt exist!`);
                res.status(400).send('Order Doesnt Exist!')
            }
        }catch(err){
            res.status(500).send('Server Error!');
            await pool.query('ROLLBACK');
            throw err;
        }
    }
    req.session.car = [];
    res.status(200).send('OrderDetail Created!')
   
}

module.exports = {
    createOrderDetail
}