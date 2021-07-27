const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');

const createAdmin = async (req, res) => {
    const {name, username, email, password } = req.body;
    const role = "ADMIN";

    try{
        await pool.query('BEGIN');
        const checkUser = await pool.query(queries.CHECKUSER, [username]);

    if(checkUser.rows == '') {
        
        const salt = bcrypt.genSaltSync(12);
        const HashPass = bcrypt.hashSync(password, salt);
        const response = await pool.query(queries.CREATE_USER, [name, username, email, HashPass, role]);
        console.log(response.rows);
        res.status(200).send('User Created!')
        await pool.query('COMMIT');

    }else{
        console.log('Username Exist!')
        res.status(400).send('Username In Use!');
    }

    }catch(err){
        res.status(500).send('Server Error!');
        await pool.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createAdmin
}