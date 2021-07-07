const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getBills = async (req, res) => {
    try{
        const response = await pool.query(queries.GET_BILLS);
        console.log('Showing Bills!');
        res.status(200).send(response.rows);
    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

const getBillsById = async (req, res) => {
    try{
        const id = req.params.id;
        const checkId = await pool.query(queries.CHECKBILLID, [id]);

        if(checkId.rows != ''){
            const response = await pool.query(queries.GET_BILLBYID, [id]);
            console.log(`Showing Bill ${id}`);
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Bill ${id} not found!`);
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err;
    }
}

const getBillByUsername = async (username) => {
    try{
        const response = await pool.query(queries.GET_BILLBYUSERNAME, [username]);

        if(response) {
            console.log('Bill Found!');
            return ({
                id: response.rows[0].id,
                username: response.rows[0].username,
                detail: response.rows[0].detail
            })
        }else{
            console.log('Bill not Found!');
            return null;
        }
    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

module.exports = {
    getBills,
    getBillByUsername,
    getBillsById
}