const isAuth =  (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(400).send('You must be Logged In!'); 
    }
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
        }else{
        res.status(300).send('You already have a session!');
    }
}

module.exports = {
    isAuth,
    isLogged
}