const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');
const order = require('../helpers/authorder');

const createUser = async(req, res) => {

    const {name, username, email, password, direccion} = req.body;
    const role = "CLIENT";
    
        try{
            await pool.query('BEGIN');
            const checkUser = await pool.query(queries.CHECKUSER, [username]);
            const checkEmail = await pool.query(queries.CHECKEMAIL, [email]);

            if(checkUser.rows == ''){
                if(checkEmail.rows == ''){
                    
                    const salt = bcrypt.genSaltSync(12);
                    const HashPass = bcrypt.hashSync(password, salt);
                    const response = await pool.query(queries.CREATE_USER, [name, username, email, HashPass, role, direccion]);
                    console.log(response.rows);
                    res.status(200).send('User Created!')
                    await pool.query('COMMIT');
                }else{
                    res.status(400).send('Email Exist');
                }
            }else{
                res.status(400).send('User Exist!')
            }
        }catch(err){
            res.status(500).send('Server Error!');
            await pool.query('ROLLBACK');
            throw err;
        }
    
}

const updateUser = async (req, res) =>{
  
    try{ 
    await pool.query('BEGIN'); 
    const id = req.user;
    const {email} = req.body;
    
    const checkIdU = await pool.query(queries.CHECKID, [id]);
    const checkEmailU = await pool.query(queries.CHECKEMAIL, [email]);

    if(checkIdU.rows != ''){
        if(checkEmailU.rows == ''){
        
    
    const response = await pool.query(queries.UPDATE_USER, [email, id]);
    console.log(response.rows);
    res.status(200).send(`User ${id} updated!`)
    await pool.query('COMMIT');
        }else{
        console.log(checkEmailU.rows);
        res.status(400).send('Email Already exist!')
    }

    }else{
        console.log(checkIdU.rows);
        res.status(400).send(`User Id ${id} not found!`)
    }
    }catch(err){
        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const deleteUser = async (req, res) =>{
    const id = req.params.id;
    console.log(id)
    try{
    await pool.query('BEGIN');
    const checkIdD = await pool.query(queries.CHECKID, [id]);
    const username = checkIdD.rows[0].username;

    if(checkIdD.rows != ''){
    
    await order.deleteOrderUser(username);
    const response = await pool.query(queries.DELETE_USER, [id]);
    
    await pool.query('COMMIT');
    console.log(response);
    res.status(200).send(`User ${id} Deleted!`)
    }else{
        res.status(400).send(`User Id ${id} not found!`);
    }

    }catch(err){
        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const adminUpdateUser = async (req, res) => {

    try{ 
        await pool.query('BEGIN'); 
        const id = req.params.id;
        const {name, direccion} = req.body;
        
        const checkIdU = await pool.query(queries.CHECKID, [id]);
    
        if(checkIdU.rows != ''){
            const response = await pool.query(queries.ADMIN_UPDATE, [name, direccion, id]);
            console.log(response.rows[0]);
            await pool.query('COMMIT');
            res.status(200).send(response.rows[0]);
        }else{
            console.log(checkIdU.rows);
            res.status(400).send(`User Id ${id} not found!`)
        }
        }catch(err){
            await pool.query('ROLLBACK');
            res.status(500).send('Server Error!');
            throw err;
        }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    adminUpdateUser
}