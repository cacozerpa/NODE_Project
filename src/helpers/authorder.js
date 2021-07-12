const pool = require('../utils/pool');
const queries = require('../utils/queries');

const createOrder = async(req, res) => {
    const {total} = req.body;
    const id = req.params.id;

    try{    
        await pool.query('BEGIN');
        const user = await pool.query(queries.GET_USERBYID, [id]);
    
        console.log(user.rows);
        if(user.rows != ''){
            const username = user.rows[0].username;
            const response = await pool.query(queries.CREATE_ORDER, [username, total]);
            console.log(response.rows);
            res.status(200).send('Order Created!')
            await pool.query('COMMIT');
        }else{
            console.log(`User ${id} not found!`)
            res.status(400).send('Username not found!');
        }
        
    }catch(err){
        res.status(500).send('Server Error!');
        await pool.query('ROLLBACK');
        throw err;
    }
}

const deleteOrder = async (req, res) => {
    try{
        await pool.query('BEGIN');
        const id = req.params.id;
        const checkId = await pool.query(queries.CHECKORDERID, [id]);

        if(checkId.rows != ''){
            const response = await pool.query(queries.DELETE_ORDER, [id]);
            await pool.query('COMMIT');
            console.log(response);
            res.status(200).send(`Order ${id} Deleted!`);
        }else{
            res.status(400).send(`Order Id: ${id} not Found!`);
        }
    }catch(err){

        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    createOrder,
    deleteOrder
}