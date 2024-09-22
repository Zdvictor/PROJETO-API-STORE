const User = require("../models/User")
const UsersValidator = require("../validators/users")
const createJWT = require("../services/jwt/jwt")



class UserController {

    async profile(req,res) {


        res.json(req.user)

    }

    async login(req,res) {

        const {email,password} = req.body
        
        const result = await User.signin(email,password)

        if(result.status) {

            const token = await createJWT(result)

            res.cookie("token", token, {httpOnly: true, secure: true, sameSite: 'strict' })
            res.json({msg: result.msg, token: token})
          

        }else {

            res.status(401).json({err: result.err})

        }

    }

    async register(req,res) {

        const {name,cpf,email,password} = req.body
        const isValid = await UsersValidator.validate({name, cpf, email,password})

        if(!isValid.status) {
            
            return res.status(400).json({err: isValid.err})

        }

        const result = await User.signup(name,cpf,email,password)

        if(result.status) {
            
            const token = await createJWT(result)

            res.cookie("token", token, {httpOnly: true, secure: true, sameSite: 'strict' })

            res.json({msg: result.msg})
            
    
            

        }else {

            res.status(401).json({err: result.err})

        }

    }

    
    async upload(req,res) {

        const id = req.params.id

        if(req.user.id !== Number(id) ) {

            return res.status(403).json({err: "Usuario Não Pode Atualizar Foto de Outro Usuario"})

        }

        const imagePath = req.file.path
        const path = imagePath.split('\\').pop()

        const result = await User.UploadImage(id,path)

        if(result.status) {

            res.json({msg: result.msg, file: path})

        }else {

            res.status(500).json({err: result.err})

        }

        


    }


    async update(req,res) {
        
        const {emailAtual, name} = req.body

        if(emailAtual !== req.user.email) {
            
            return res.status(403).json({err: "Usuario Não Pode Atualizar Outro Usuario"})

        }

        const isValid = await UsersValidator.validate({emailAtual, name})

        if(!isValid.status) {

            return res.status(400).json({err: isValid.err})

        }
        
        const result = await User.update(emailAtual,name)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(500).json({err: result.err})

        }
    }

    async delete(req,res) {
    
        const email = req.body.email

        if(email !== req.user.email) {
            
            return res.status(403).json({err: "Usuario Não Pode Deletar Outro Usuario"})

        }

        const result = await User.deleteByEmail(email)

        if(result.status) {

            res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'strict'  })
            res.json(result.msg)

        }else {

            res.status(500).json({err: result.err})

        }

    }


}

module.exports = new UserController()