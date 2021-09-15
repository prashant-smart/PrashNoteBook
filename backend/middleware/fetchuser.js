//middle ware is a function it is run just before we execution of async functions of routes
//this is excute every time when getuser endpoint is goining to execute
// we can also make this fucntion in route but this function also used in many end point thats y we seprate it
const jwt = require('jsonwebtoken')
const JWT_secret = 'PrashantKumar224Yadav@';


const fetchUser=(req, res,next) => {
    //Get the user from jwt token and add it to id request object
    const token=req.header('auth-token');
    if(!token) {
        res.status(401).send({error:"please authenticate with valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_secret);
        req.user = data.user;
    } catch (error) {
        res.status(401).send({error:"please authenticate with valid token"})
    }
    next();//this is the async fuunction of route
}

module.exports = fetchUser