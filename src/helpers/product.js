const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getProducts = async (req, res) => {
    try{
        const response = await pool.query(queries.GET_PRODUCTS);
        console.log('Showing products!');
        res.send(response.rows);
        }catch(err){
            res.status(500).send('Server Error!')
            throw err;
        }
}

const getProductsById = async (req,res) => {
    try{

    const id = req.params.id;
    const checkId = await pool.query(queries.CHECKID, [id]);

    if(checkId.rows != ''){
        const response = await pool.query(queries.GET_PRODUCTBYID, [id]);
        console.log(`Showing Product ${id}!`);
        res.status(200).send(response.rows);    
    }else{
        res.status(400).send(`Product ${id} not found!`)
    }

    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    getProducts,
    getProductsById
}