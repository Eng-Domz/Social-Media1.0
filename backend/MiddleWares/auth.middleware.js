const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
exports.valid = ((req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message: 'Unauthorized'});
        next(error);
    }
    }
)