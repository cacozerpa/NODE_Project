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
            const product = await pool.query(queries.GET_PRODUCTBYID, [prod_id]);
            const name = product.rows[0].name;
            const price = product.rows[0].price;
            const img = product.rows[0].img;
    
            if(order.rows != ''){
                const response = await pool.query(queries.CREATE_ORDERDETAILS, [orderId, qty, prod_id, name, price, total, img]);
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

const deleteOrderDetail = async (req, res) => {
    id = req.params.id;
    try{
        await pool.query('BEGIN');
        const detail = await pool.query(queries.CHECKORDERDETAILID, [id]);
        qty = detail.rows[0].qty;

        if(detail.rows != ''){
            if(qty == 1){
                const response = await pool.query(queries.DELETE_DETAIL, [id]);
                console.log(`Detail eliminated! ${response}`);
                res.status(200).send('Detail eliminated!')
                await pool.query('COMMIT');
            }else{
                qty = qty - 1;
                const detailUpdate = await pool.query(queries.UPDATE_DETAIL, [qty, id])
                await pool.query('COMMIT');
                res.status(200).send('Item deleted!');
            }
        }else{
            console.log('Detail not found!');
            res.status(400).send('Detail not found!')
        }
        
    }catch(err){    
        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!')
        throw err;
    }
}

const updateDetail = async (req, res) => {
    const {qty, prod_price} = req.body;
    id = req.params.id;
    try{
        const detail = await pool.query(queries.CHECKORDERDETAILID, [id]);
        
        if(detail.rows != ''){
            const response = pool.query(queries.UPDATE_DETAIL, [qty, prod_price, id])
        }else{
            console.log('Detail not found!');
            res.status(400).send('Detail not found!')
        }
    }catch(err){
        await pool.query('ROLLBACK');
        res.status(500).send('Server Error');
        throw err;
    }
}

module.exports = {
    createOrderDetail,
    deleteOrderDetail,
    updateDetail
}