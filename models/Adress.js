const knex = require("../database/database")

class Adress {


    async AddAdress(idUser, num,neigh,street,city,state,cep) {

        try {

            var addAdress = await knex("endereco").insert({

                numero: num,
                bairro: neigh,
                rua: street,
                cidade: city,
                estado: state,
                cep: cep

            })

            var idAdress

            addAdress.map((a) => idAdress = a)

           

            var insertUser = await knex("users").update({

                endereco_id: idAdress

            }).where({id: idUser})

            return {status: true, msg: "Endereço Adicionado Com Sucesso", id: idAdress}

     }catch(err) {

        console.log(err)
        return {status: false, err: "Erro ao Adicionar Endereço"}

    }

    }

    async UpdateAdress(idUser, num,neigh,street,city,state,cep) {

        try {

            var idAdressUser = await knex("users").select("endereco_id").where({id: idUser})

            var idAdress = idAdressUser[0].endereco_id


            var changeAdress = await knex("endereco").update({

                
                numero: num,
                bairro: neigh,
                rua: street,
                cidade: city,
                estado: state,
                cep: cep

            }).where({id: idAdress})

            return {status: true, msg: "Endereço Atualizado Com Sucesso", id: idAdress}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Atualizar Endereço"}

        }


    }

    async RemoveAdress(idUser) {

        try {

            var id = await knex("users").select("endereco_id").where({id: idUser})

            var idAdress = id[0].endereco_id

            var removeAdress = await knex("endereco").delete().where({id: idAdress})

            return {status: true, msg: "Endereço Removido com Sucesso"}




        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Remover Endereço"}
        }

    }

}

module.exports = new Adress()