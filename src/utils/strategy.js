const localStrategy = require('passport-local').Strategy;
const userHelper = require('../helpers/user');
const bcrypt = require('bcrypt');
const pool = require('./pool');
const queries = require('./queries');

const localOptions = {
  usernameField: 'username',
  passwordField: 'password'
};

const strategy = new localStrategy(localOptions, async (username, password, done) => {
  console.log(req.body);
  console.log(username);
  console.log(password);
})

module.export ={
  strategy
}
