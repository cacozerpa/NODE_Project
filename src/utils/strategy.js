const localStrategy = require('passport-local').Strategy;
const userHelper = require('../helpers/user');
const bcrypt = require('bcrypt');
const pool = require('./pool');
const queries = require('./queries');

const strategy = new localStrategy(async (username, password, done) => {
  const {username, password} = req.body;
  const salt = bcrypt.genSaltSync(12);
  const hashPass = bcrypt.hashSync(password, salt);
  try{
    const checkUsername = await pool.query(queries.CHECKUSER, [username]);
    if(checkUsername.rows == ''){
      return done(null, false, res.status(400).send('User not Found!'));
    }else{
      const checkPassword = await pool.query(queries.CHECKPASS, [password]);

    }

  }catch(err){
    throw err;
  }
})

module.export ={
  strategy
}
