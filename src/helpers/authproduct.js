const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');

const createProd = async (req, res) => {

    const {name, price, description} = req.body;

    try{
    const checkProd = await pool.query(queries.CHECKPROD);
    if(checkProd.rows == ''){
    await pool.query('BEGIN');
    const response = pool.query(queries.CREATE_PRODUCT, [name, price, description]);
    await pool.query('COMMIT');
    }else{
        res.status(400).send('Product Already Exist!');
        pool.query('ROLLBACK')
    }
    }catch(err){
        pool.query('ROLLBACK');
        res.status(500).send('Server Error!')
        throw err;
    }
    

}

const UpdateProduct = async (req, res) => {
    try{ 
        await pool.query('BEGIN');
        const id = req.params.id;
        const {name, price, description} = req.body;
        const checkId = await pool.query(queries.CHECKID, [id]);

        if(checkId.row == ''){
        const response = await pool.query(queries.UPDATE_PRODUCT, [name, price, description]);
        console.log(response);
        await pool.query('COMMIT')
        }else{
            await pool.query('ROLLBACK');
            res.status(400).send(`Product Id (${id}) not found! `);

        }
        
    }catch(err){
        res.status(500).send('Server Error!');
        await pool.query('ROLLBACK');
        throw err;
    }
}

const deleteProd = async (req, res) => {
    try{
    await pool.query('BEGIN');
    const id = req.params.id;
    const checkId = await pool.query(queries.CHECKID, [id]);

    if(checkId.rows == ''){
        await pool.query('COMMIT');
        console.log();
        res.status(200).send(`User id: ${id} deleted!`)
    }else{

    }

    }catch(err){
        pool.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

module.exports = {
    createProd,
    UpdateProduct,
    deleteProd
}