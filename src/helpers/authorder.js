const pool = require('../utils/pool');
const queries = require('../utils/queries');

const createOrder = async(user, total) => {
    const date = new Date();
    const id = user;
    try{    
        await pool.query('BEGIN');
        const user = await pool.query(queries.GET_USERBYID, [id]);
    
        console.log(user.rows);
        if(user.rows != ''){
            const username = user.rows[0].username;
            const response = await pool.query(queries.CREATE_ORDER, [username, date, total]);
            await pool.query('COMMIT');
            if(response){
                return({
                    id: response.rows[0].order_id
                })
            }
        }else{
            console.log(`User ${id} not found!`)
        }
        
    }catch(err){
        await pool.query('ROLLBACK');
        throw err;
    }
}

const deleteOrder = async (req, res) => {
    try{
        await pool.query('BEGIN');
        const order_id = req.params.order_id;
        const checkId = await pool.query(queries.CHECKORDERID, [order_id]);

        if(checkId.rows != ''){
            const details = await pool.query(queries.DELETE_ORDERDETAIL, [order_id]);
            const response = await pool.query(queries.DELETE_ORDER, [order_id]);
            await pool.query('COMMIT');
            console.log(response.rows + details.rows);
            console.log(`Order ${order_id} deleted!`)
            res.status(200).send(`Order ${order_id} Deleted!`);
        }else{
            res.status(400).send(`Order Id: ${order_id} not Found!`);
        }
    }catch(err){

        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!')
        throw err;
    }
}

const deleteOrderUser = async (username) => {
    try{
            await pool.query('BEGIN');
            const order = await pool.query(queries.GET_ORDERBYUSERNAME, [username]);
            console.log(order.rows);

            if(order.rows != ''){
                const orderid = order.rows[0].order_id;
                const details = await pool.query(queries.DELETE_ORDERDETAIL, [orderid]);
                const response = await pool.query(queries.DELETE_ORDERUSER, [username]);
                await pool.query('COMMIT');
                
                console.log(response.rows + details.rows);
            }else{
                console.log("User Has no oders!");
                await pool.query('ROLLBACK')
            }
      
    }catch(err){

        await pool.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createOrder,
    deleteOrder,
    deleteOrderUser
}