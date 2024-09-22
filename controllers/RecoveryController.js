const Recovery = require("../models/Recovery")
const Users = require("../models/User")
const UsersValidator = require("../validators/users")
const mailer = require("../services/mail/mail")

class RecoveryController {

    async recovery(req,res) {

        const email = req.body.email

        const emailExist = await Users.findByEmail(email)


        if(!emailExist.status) {

            return res.status(400).json({err: emailExist.err})

        }

        const name = emailExist.data[0].name

        const result = await Recovery.SendRecovery(email)

        if(result.status) {

            mailer(name, email, result.code)
            res.json({msg: result.msg, code: result.code})

        }else {

            res.status(500).json({err: result.err})

        }

    }

    async verify(req,res) {

        const code = req.body.code

        const result = await Recovery.verifyCode(code)

        if(result.status) {

            res.json({msg: result.msg})

        }else {

            res.status(500).json({err: result.err})

        }
    }


    async change(req,res) {

        const {code, newPassword} = req.body

        const isWeakPassword =  UsersValidator.validatePassword(newPassword)

        if(!isWeakPassword.status) {

            return res.status(400).json({err: isWeakPassword.msg})

        }

        const result = await Recovery.changePassword(code, newPassword)

        if(result.status) {

            res.json({msg: result.msg})

        }else {

            res.status(500).json({err: result.err})

        }


    }

}


module.exports = new RecoveryController()