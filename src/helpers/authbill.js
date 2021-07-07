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

const deleteBill = async (req, res) => {
    try{
        await pool.query('BEGIN');
        const id = req.params.id;
        const checkId = await pool.query(queries.CHECKBILLID, [id]);

        if(checkId.rows != ''){
            const response = await pool.query(queries.DELETE_BILL, [id]);
            await pool.query('COMMIT');
            console.log(response);
            res.status(200).send(`Bill ${id} Deleted!`);
        }else{
            res.status(400).send(`Bill Id: ${id} not Found!`);
        }
    }catch(err){

        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    createBill,
    deleteBill
}