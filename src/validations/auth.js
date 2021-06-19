const isAuth =  (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(200).send('You must be Logged In!');
    }
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(200).send('You must be Logged In!');
    }
}

module.exports = {
    isAuth,
    isLogged
}