const jwt = require("jsonwebtoken")
require('dotenv').config();

const secretKey = process.env.JWT_SECRET

module.exports = function AuthMiddleware(req,res,next) {

    const token = req.cookies.token

    if(!token) {

        return res.status(403).json({msg: "Usuario Não Autenticado"})

    }


    try {

        const decoded = jwt.verify(token, secretKey)

        req.user = decoded

        next()



    }catch(err) {

        console.log(err)
        return res.status(401).json({err: "Token inválido ou expirado"})

    }

}