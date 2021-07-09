const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getOrders = async (req, res) => {
    try{
        const response = await pool.query(queries.GET_ORDERS);
        console.log('Showing Orders!');
        res.status(200).send(response.rows);
    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

const getOrderById = async (req, res) => {
    try{
        const order_id = req.params.order_id;
        const checkId = await pool.query(queries.CHECKORDERID, [order_id]);

        if(checkId.rows != ''){
            const response = await pool.query(queries.GET_ORDERBYID, [order_id]);
            console.log(`Showing Order ${order_id}`);
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Order ${order_id} not found!`);
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

const getOrderByUsername = async (username) => {
    try{
        const response = await pool.query(queries.GET_ORDERBYUSERNAME, [username]);

        if(response) {
            console.log('Order Found!');
            return ({
                id: response.rows[0].id,
                username: response.rows[0].username,
                detail: response.rows[0].detail
            })
        }else{
            console.log('Order not Found!');
            return null;
        }
    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    getOrders,
    getOrderByUsername,
    getOrderById
}