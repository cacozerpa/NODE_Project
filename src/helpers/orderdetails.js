const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getOrderDetails = async (req, res) => {
    try{
        const response = await pool.query(queries.GET_ORDERSDETAILS);
        console.log('Showing Orders Details!');
        res.status(200).send(response.rows);
    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

const getOrderByOrderId = async (req, res) => {
    try{
        const id = req.params.id;
        const checkId = await pool.query(queries.CHECKORDERID, [id]);

        if(checkId.rows != ''){
            const response = await pool.query(queries.GET_ORDERDETAILBYORDERID, [id]);
            console.log(`Showing Order ${id}`);
            console.log(response.rows)
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Order Detail ${id} not found!`);
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

module.exports = {
    getOrderDetails,
    getOrderByOrderId
}