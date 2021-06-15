const pool = require('../utils/pool');
const queries = require('../utils/queries');

const getUsers = async (req, res) =>{
    try{
    const response = await pool.query(queries.GET_USERS);
    console.log('Showing Users!');
    res.status(200).send(response.rows);
    }catch(err){    
        res.status(500).send('Server Error!')
        throw err;
    }
}

const getUsersById = async (req,res) => {
    try{

    const id = req.params.id;
    const checkId = await pool.query(queries.CHECKID, [id]);

    if(checkId.rows != ''){
        const response = await pool.query(queries.GET_USERBYID, [id]);
        console.log(`Showing User ${id}!`);
        res.status(200).send(response.rows);
    }else{
        res.status(400).send(`User ${id} not found!`)
    }

    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

const getUserByUsername = async (username) => {

    try{ 
       
        const response = await pool.query(queries.GET_USERBYUSERNAME, [username]);
        
        if(response){
            console.log('Username Found!')
            return ({
                id: response.rows[0].id,
                name: response.rows[0].name,
                username: response.rows[0].username,
                email: response.rows[0].email,
                password: response.rows[0].password
            })
        }else{
           console.log('Username Not Found!')
           return null;
        }

    }catch(err){
        throw err; 
    }
}

module.exports = {
    getUsers,
    getUsersById,
    getUserByUsername
}