const pool = require('../utils/pool');
const queries = require('../utils/queries');

const createOrderDetail = async (req, res) => {

    car = req.session.car;
    orderId = req.params.order_id;
    
    for(var i = 0; i < car.length; i++){
         prod_id = car[i].id
         qty = 1;
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
    res.status(200).send('OrderDetail Created!')
   
}

module.exports = {
    createOrderDetail
}