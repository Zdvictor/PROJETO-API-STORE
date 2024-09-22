const { validate } = require("deep-email-validator")
const { cpf } = require("cpf-cnpj-validator")
const PasswordValidator = require("password-validator")

var schema = new PasswordValidator()

schema
.is().min(4)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


class Validator {

    async validate(data) {

        var result = await this.validateFields({
            emailAtual: data.emailAtual,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            password: data.password
        })

        return result

        

        }

    
    async validateFields(obj) {


        var resultAtualEmail = obj.emailAtual ? await this.validateEmail(obj.emailAtual) : {status: true} 
        var resultName =  obj.name ? await this.validateName(obj.name) : {status: true}
        var resultCpf =  obj.cpf ? await this.validateCpf(obj.cpf) : {status: true}
        var resultNewEmail = obj.email ? await this.validateEmail(obj.email) : {status: true}
        var resultPassword =  obj.password ? await this.validatePassword(obj.password) : {status: true}

        if(!resultAtualEmail.status) {

            return {status: false, err: resultAtualEmail.msg}

        }else if(!resultName.status) {

            return {status: false, err: resultName.msg}

        }else if(!resultCpf.status) {

            return {status: false, err: resultCpf.msg}

        }else if(!resultNewEmail.status) {

            return {status: false, err: resultNewEmail.msg}

        }else if(!resultPassword.status) {

            return {status: false, err: resultPassword.msg}

        }

        return {status: true, msg: "Dados Corretos"}




    }
    


    validateName(name) {

        var n = name
        var qtdNome = n.length

        if(n == null || n == undefined || n == " " || n == "  " || n.length < 4) {

            return {status: false, msg: "Nome Invalido"}

        }else {

            for(var i = 0; i < qtdNome; i++) {

                if(Number(n[i])) {

                    return {status: false, msg: "Nome Invalido"}

                }

            }

            return {status: true, msg: "Nome Valido"}

        }


        


    }

    validateCpf(numCpf) {

        var isValid = cpf.isValid(numCpf)


        if(isValid) {

            return {status: true, msg: "Cpf Valido"}
        }else {

            return {status: false, msg: "Cpf Invalido"}
        }

    }



    async validateEmail(email) {

        const isValid = await validate(email)

        if(isValid.valid) {

            return {status: true, msg: "Email Correto"}

        }else {

            return {status: false, msg: "Email Invalido"}

        }

    }

    validatePassword(password) {
        
        const isValid = schema.validate(password)

        if(isValid) {

            return {status: true, msg: "Senha Correta"}

        }else {
            console.log("ERRO")
            return {status: false, msg: "Senha inválida ou fraca"}

        }

    }


}


module.exports = new Validator()