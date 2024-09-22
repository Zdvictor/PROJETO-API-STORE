const knex = require("../database/database")
const bcypt = require("bcrypt")


class User {

    
    async dataUser(email) {


        try {

            var result = await knex('users').select('id', 'name', 'cpf', 'email', 'endereco_id', 'created_at', 'updated_at', 'image').where({email});

            if(result.length > 0) {

                return {status: true, data: result}

            }else {

                return {status: false, err: "Nenhum Usuario Encontrado"}

            }



        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema na Busca de Dados do Usuario"}

        }

    }

    async signin(email,password) {

        try {

            var userExist = await this.findByEmail(email)

            if(!userExist.status) {
                
                return {status: false, err: "Usuario Não Cadastrado"}

            }


            var senha = userExist.data[0].password


            if(userExist.data.length > 0) {

                var correct = await bcypt.compare(password,senha)

                if(correct) {

                    var userData = await this.dataUser(email)

                    return {status: true, msg: "Usuario Autenticado com Sucesso", data: userData.data[0]}

                }else {

                    return {status: false, err: "Senha Invalida"}

                }
 
            }


        }catch(err) {

            return {status: false, err: "Problema na Autenticação"}
            console.log(err)

        }


    }

    async signup(name,cpf,email,password) {

        try {

            var emailExist = await this.findByEmail(email)
            var cpfExist = await this.findByCpf(cpf)

            if(emailExist.status) {

                return {status: false, err: "O Email ja Esta Cadastrado"}

            }

            if(cpfExist.status) {

                return {status: false, err: "O Cpf ja Esta Cadastrado"}

            }

            var hash = await bcypt.hash(password, 10)

            var result = await knex.insert({

                name,
                cpf,
                email,
                password: hash
                
            }).into("users")


            var userData = await this.dataUser(email)


            return {status: true, msg: "Usuario Cadastrado Com Sucesso", data: userData.data[0]}


        }catch(err) {

            return {status: false, err: "Usuario Nao Cadastrado"}

        }

    }

    async findByEmail(email) {

        try {

            var result = await knex.select("*").where({email}).table("users")

            if(result.length > 0) {
    
                return {status:true, data: result}
    
            }else {
    
                return {status: false, err: "Email Não Esta Cadastrado"}
    
            }

        }catch(err) {

            return {status: false, err: "Email Não Esta Cadastrado"}

        }

    }

    async findByCpf(cpf) {

        try {

            var result = await knex.select("*").where({cpf}).from("users")

            if(result.length > 0) {

                return {status: true, data: result}

            }else {

                return {status: false}

            }



        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema no Busca de CPF"}


        }

    }

    async deleteByEmail(email) {
        
        try {

            var userExist = await this.findByEmail(email)

            if(userExist.status) {
                
                await knex.delete().where({email}).table("users")

                return {status: true, msg: "Usuario Deletado"}

            }else {

                return {status: false, err: "Ops Usuario Nao Existe"}

            }

        }catch(err) {

            return {status: false, err: "Problema na Deleção"}

        }

    }


    async update(emailAtual, name, cpf, email, password) {


        try {

            var existEmail = await this.findByEmail(emailAtual)

            if(!existEmail.status) {


                return {status: false, err: "Não Existe Usuario com esse email no banco de dados"}

            }

                        
            var result = await knex.update({name}).where({email: emailAtual}).from("users")

            return {status: true, msg: "Usuario Atualizado com Sucesso"}



        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema na Atualização"}


        }



    }

    async UploadImage(id,path) {

        try {

            var result = await knex("users").update({

                image: path

            }).where({id})


            return {status: true, msg: "Imagem Salva com Sucesso"}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha em Salvar a Imagem"}

        }

    }


}


module.exports = new User()