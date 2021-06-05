const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');

const CreateUser = async(req, res) => {

    const {name, username, email, password} = req.body;
    
        try{
            const checkUser = await pool.query(queries.CHECKUSER, [username]);
            const checkEmail = await pool.query(queries.CHECKEMAIL, [email]);

            if(checkUser.rows == ''){
                if(checkEmail.rows == ''){
                    await pool.query('BEGIN');
                    const salt = bcrypt.genSaltSync(12);
                    const HashPass = bcrypt.hashSync(password, salt);
                    const response = await pool.query(queries.CREATE_USER, [name, username, email, HashPass]);
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

const UpdateUser = async (req, res) =>{
    const id = req.params.id;
    const {email} = req.body;
    try{
    const checkIdU = await pool.query(queries.CHECKID, [id]);

    if(checkIdU.rows == ''){
        
    const checkEmailU = await pool.query(queries.CHECKEMAIL, [email]);

    if(checkEmailU.rows == ''){
        
    await pool.query('BEGIN');
    const response = await pool.query(queries.UPDATE_USER, [email, id]);
    console.log(response.rows);
    res.status(200).send(`User ${id} updated!`)
    }else{
        res.status(400).send('This email already Exist!')
    }

    }else{
        res.status(400).send(`User Id ${id} not found!`)
    }
    }catch(err){
        await pool.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const DeleteUser = async (req, res) =>{

}

module.exports = {
    CreateUser,
    UpdateUser,
    DeleteUser
}