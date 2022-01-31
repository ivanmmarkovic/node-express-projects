const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    let bearer = req.header("Authorization");
    if(!bearer){
        res.status(401);
        res.send({message: "Unauthorized"});
    }
    try {
        let [, token] = bearer.split(" ");
        payload = jwt.verify(token, global.jwtKey);
        // add payload to req
        req.payload = payload;
        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401);
            return res.send({message: "Unauthorized"});
        }
        else{
            res.status(400);
            return res.send({message: "Bad Request"});
        }
    }
};


module.exports = auth;