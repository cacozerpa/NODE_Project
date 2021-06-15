const pool = require('../utils/pool');
const queries = require('../utils/queries');
const bcrypt = require('bcrypt');

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

const getUserByUsername = async (req, res) => {
    try{ 
        const username = req.body;
        const response = await pool.query(queries.GET_USERBYUSERNAME, [username]);

        if(response.rows == ''){
            res.status(400).send('Username not found!');
        }else{
            console.log('Username Found!')
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err; 
    }
}

const comparePass = async (req, res) =>{
    bcrypt.compare(username, hash, (err, isMatch) => {
        if(err){
            res.status(400).send('Password Doesnt Match!');
        }else{
            res(isMatch);
        }
    })
}

module.exports = {
    getUsers,
    getUsersById,
    getUserByUsername
}