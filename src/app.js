const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config({path:'../.env'});

const AuthRoutes = require('./routes/auth');
const UserRoutes = require('./routes/user');
const AuthProdRoutes = require('./routes/authproduct');
const ProductRoutes = require('./routes/product')
const LoginRoute = require('./routes/userlogin');

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.SECRET || 'Just a Secret!'))
app.use(session({
  secret: process.env.SECRET || 'Not a Secret!',
  resave: true,
  saveUninitialized: true,
}));

passport.use('local', require('./utils/strategy'));

passport.serializeUser(function(user, done) {
  console.log('este es el maldito usuario que esta loggeado: ' + user.username);
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  console.log('pilas con esta verga pue: ' + user.id);
  return done(null, user.id);
})

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../src/public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`App Running on port: ${PORT}`);

app.use(AuthRoutes);
app.use(UserRoutes);
app.use(AuthProdRoutes);
app.use(ProductRoutes);
app.use(LoginRoute);

app.get('/', (req, res) => {
    res.render('../public/index.html');
})

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
}))
