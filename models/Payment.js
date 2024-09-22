const knex = require("../database/database")

const moment = require('moment-timezone');
require('moment/locale/pt-br');

moment.locale('pt-br'); 




class Payment {

    async FindAllOrders(idUser) {

        try {
            var result = await knex("orders")
            .join("users", "orders.id_user", "=", "users.id")
            .join("products", "orders.id_product", "=", "products.id")
            .join("endereco", "users.endereco_id", "=", "endereco.id")
            .select(
            "orders.*","users.name", "users.cpf", "users.email",
            "users.endereco_id","endereco.numero","endereco.bairro",
            "endereco.rua","endereco.cidade","endereco.estado","endereco.cep",
            "products.name as nome_produto",
            "products.price as preço_produto", "products.description as descrição_produto",
            "products.image as image")
            .where("users.id", idUser)


            var newObj = []       


            result.forEach(data => {

                newObj.push(
                    
                    {   

                    Order: {
                        Status: {

                            id: data.id,
                            paid: Number(data.isPaid),
                            date:  moment.utc(data.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')

                        },

                        User: {

                            id: data.id_user,
                            name: data.name,
                            cpf: data.cpf,
                            email: data.email

                        },

                        Adress: {

                            id: data.endereco_id,
                            number: Number(data.numero),
                            neighborhood: data.bairro,
                            street: data.rua,
                            city: data.cidade,
                            state: data.estado,
                            cep: data.cep

                        },

                        Product: {

                            id: data.id_product,
                            name: data.nome_produto,
                            price: data.preço_produto,
                            description: data.descrição_produto,
                            img: data.image

                        },

                        Link: {

                            url: data.link

                        }
                    }
                }
            )
            })



            if(result.length > 0) {

                return {status: true, msg: "Lista De Pedidos Vazia", orders: newObj}

            }else {
                
                return {status: false, products: null, err:"Pedidos Vazio"}

            }

        }catch(err) {

            console.log(err)
            return {status: false, products: null, err:"Falha na Busca dos Pedidos"}
        }


    }

    async HaveAdress(idUser) {

        try {

            var result = await knex("users").select("endereco_id").where({id: idUser})

            var adress = result[0].endereco_id

            if(adress == null) {

                return {status: false, err: "Usuario Precisa Cadastrar Endereço Antes de Comprar"}
                
            }

            return {status: true, msg: "Usuario com Email Cadastrado"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Encontrar Endereço do Usuario"}

        }
        
    }

    async FindDataForOrder(idUser,idProduct) {
 

        var resultEmail = await knex('users').select('email').where({ id: idUser }).first();

        var product = await knex("users").select("price", "description").from("products").where({id: idProduct})

        var data = {

            email: resultEmail.email,
            product: {

                price: product[0].price,
                description: product[0].description
            }
        }


        return {status: true, data: data}
    
       
    }

    async CreateOrder(idOrder, idUser,idProduct,link) {

        try {
            

            var result = await knex.insert(
            {   
                id: idOrder,
                id_user: idUser,
                id_product: idProduct,
                isPaid: "0",
                link: link

            })
            .into("orders")

            var idOrder
            result.map((id) => idOrder = id )
            
            return {status: true, msg: "Pedido Criado com Sucesso", idOrder: idOrder}
            

        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Criar Pedido"}

        }

    }

    async PaidOrder(id) {


        try {
            
            var result = await knex('orders')
            .update({ isPaid: "1" , link: null})
            .where({ id: Number(id) });

            return {status: true, msg: "Pedido Pago com Sucesso"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Pagar Pedido"}

        }

    }


    async CancelOrder(id) {

        try {
            
            var result = await knex('orders')
            .update({ isPaid: "2", link: null })
            .where({ id: Number(id) });

            return {status: true, msg: "Pedido Cancelado com Sucesso"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Cancelar Pedido"}

        }       

    }

    async DeleteOrder(id) {

        try {

            var result = await knex("orders").delete().where({id})
            return {status: true, msg: "Pedido Deletado com Sucesso"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Erro ao Deletar o Pedido"}
        }

    }




}

module.exports = new Payment()