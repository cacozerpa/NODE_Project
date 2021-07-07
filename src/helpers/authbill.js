const pool = require('../utils/pool');
const queries = require('../utils/queries');

const createBill = async(req, res) => {
    const {username, total, details} = req.body;

    try{
        await pool.query('BEGIN');
        const response = await pool.query(queries.CREATE_BILL, [username, total, details]);
        console.log(response.rows);
        res.status(200).send('Bill Created!')
        await pool.query('COMMIT');
    }catch(err){
        res.status(500).send('Server Error!');
        await pool.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createBill
}