const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookieParser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;
require('dotenv').config({path:'../.env'});

const AuthRoutes = require('./routes/auth');
const UserRoutes = require('./routes/user');
const AuthProdRoutes = require('./routes/authproduct');
const ProductRoutes = require('./routes/product')


const app = express();
app.use(express.json());
qpp.use(cookieParser(process.env.SECRET || 'Just a Secret!'));
app.use(session({
  secret: process.env.SECRET;,
  resave: true,
  saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(function(username, password, done){

}))

app.use(express.static('../src/public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`App Running on port: ${PORT}`);

app.use(AuthRoutes);
app.use(UserRoutes);
app.use(AuthProdRoutes);
app.use(ProductRoutes);

app.get('/', (req, res) => {
    res.render('../public/index.html');
})

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
}))
