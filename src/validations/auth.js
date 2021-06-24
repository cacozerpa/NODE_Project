const isAuth =  (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(400).send('You must be Logged In!');
        
    }else{
        next();
    }
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(300).send('You already have a session!');
    
    }else{
        next();
    }
}

module.exports = {
    isAuth,
    isLogged
}