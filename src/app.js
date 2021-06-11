const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'../.env'});

const AuthRoutes = require('./routes/auth');
const UserRoutes = require('./routes/user');
const AuthProdRoutes = require('./routes/authproduct');
const ProductRoutes = require('./routes/product')


const app = express();
app.use(express.json());

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