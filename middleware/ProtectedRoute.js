const jwt = require("jsonwebtoken");

async function protectedRoute(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null || token == undefined){
        res.sendStatus(401)
    }else{
        jwt.verify(token, process.env.TOKENSECRETTOKEN,(error, isValid ) => {
            error && res.sendStatus(403);
            if(isValid){
                req.isValid = isValid; 
                next()
            }
        })
    }
}

module.exports = protectedRoute;