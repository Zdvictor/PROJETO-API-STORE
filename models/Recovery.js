const knex = require("../database/database")
const bcrypt = require("bcrypt")
const {v4} = require("uuid")

class Recovery {


    async SendRecovery(email) {

        try {

            var code = v4()

            var result = await knex("codesPass").insert({

                email,
                code: code,
                isUsed: "0",

            }).where({email})


            return {status: true, msg: "Codigo Enviado Para o Email com Sucesso", code: code}



        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema no Envio de Recuperação de Email"}

        }

    }

    async verifyCode(code) {

        try {

            var result = await knex("codesPass").select("*").where({code})

            if(result.length > 0) {

                if(Number(result[0].isUsed) == 1) {

                    return {status: false, err: "Codigo Já Utilizado"}

                }

                return {status: true, msg: "Codigo Valido", data: result}


            }else {

                return {status: false, err: "Codigo Inválido"}

            }



        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema na Verificação do Codigo"}

        }

    }

    async changePassword(code,newPassword) {

        try {

            var result = await this.verifyCode(code)

            if(!result.status) {

                return {status: false, err: result.err}

            }

            var email = result.data[0].email
            var hash = await bcrypt.hash(newPassword, 10)

            var changePass = await knex("users").update({

                password: hash

            }).where({email})

            var setIsUsed = await knex("codesPass").update({

                isUsed: "1"

            }).where({code})

            return {status: true, msg: "Senha Alterada com Sucesso"}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema na Troca de Senha"}

        }


    }

}


module.exports = new Recovery()