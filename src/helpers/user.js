const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getUsers = async (req, res) =>{

    try{
    const response = await pool.query(queries.GET_USERS);
    console.log('Showing Users!');
    res.send(response.rows);
    }catch(err){

        throw err;
    }

}

const getUsersById = async (req,res) => {
    try{

    const id = req.params.id;
    const response = await pool.query(queries.GET_USERBYID, [id]);
    console.log(`Showing User ${id}!`);
    res.send(response.rows);

    }catch(err){
        throw err;
    }
}

module.exports = {
    getUsers,
    getUsersById
}