const pool = require('../utils/pool');
const queries = require('../utils/queries');

const createOrderDetail = async (req, res) => {
    const {idorder, qty, prod_id} = req.body;
    
    try{
        await pool.query('BEGIN');
        const response = await pool.query(queries.CREATE_ORDERDETAILS, [idorder, qty, prod_id]);
        console.log(response.rows);
        res.status(200).send('OrderDetail Created!')
        await pool.query('COMMIT');
    }catch(err){
        res.status(500).send('Server Error!');
        await pool.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createOrderDetail
}