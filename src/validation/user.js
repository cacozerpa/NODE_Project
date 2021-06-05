const pool = require('../utils/pool');
const queries = require('../utils/queries');

const checkUser = async(req, res) => {
    const {username, email} = req.body;

    try{
        const responseUser = await pool.query(queries.CHECKUSER, [username]);
        const responseEmail = await pool.query(queries.CHECKEMAIL, [email]);

        if(!responseUser){
            if(!responseEmail){
                return username, email;
            }else{
                res.send('Email Already in use!')
            }
        }else{
            res.send('User Already in use!')
        }
    }catch(err){
        throw err;
    }
}

module.exports = {
    checkUser,
}