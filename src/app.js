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
const OrderRoutes = require('./routes/order');
const AuthOrderRoutes = require('./routes/authorder');
const OrderDetailsRoutes = require('./routes/orderdetails')
const AuthOrderDetailsRoutes = require('./routes/authorderdetails')
const AuthAdminRoute = require('./routes/authadmin');
const CarRoute = require('./routes/car');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
  allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
}))

app.use(express.json());
app.use(cookieParser(process.env.SECRET || 'Just a Secret!'))
app.use(session({
  secret: process.env.SECRET || 'Not a Secret!',
  resave: true,
  saveUninitialized: true,
}));

passport.use('local', require('./utils/strategy'));

passport.serializeUser(function(user, done) {
  console.log('user logged:' + user.username);
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  console.log('User ID: ' + user.id);
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
app.use(OrderRoutes);
app.use(AuthOrderRoutes);
app.use(OrderDetailsRoutes)
app.use(AuthOrderDetailsRoutes);
app.use(AuthAdminRoute);
app.use(CarRoute);

app.get('/', (req, res) => {
    res.render('../public/index.html');
})


