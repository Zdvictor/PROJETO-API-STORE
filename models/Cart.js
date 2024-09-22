const knex = require("../database/database")


class Cart {

    async ViewProduct(id) {

        try {
            
            var result = await knex("cart")
            .join("users", "cart.id_user", "=", "users.id")
            .join("products", "cart.id_product", "=", "products.id")
            .select("cart.*","products.name as nome_produto", "products.price as preço_produto", "products.description as descrição_produto", "products.image as image")
            .where("users.id", id)

            if(result.length > 0) {

                return {status: true, msg: "Lista De Produtos No Carrinho", products: result}

            }else {
                
                return {status: false, products: null, err:"Carrinho Vazio"}

            }

            


        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha Em Listar Produtos do Carrinho"}

        }

    }

    async RegisterProduct(idUser, idProduct) {

        try {

            var result = await knex.insert({id_user: idUser, id_product: idProduct}).into("cart")
            return {status: true, msg: "Produto Adicionado No Carrinho"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha Em Adicionar o Produto No Carrinho"}

        }

    }


    async DeleteProduct(idUser,idProduct) {

        try {

            var result = await knex.delete().where({id_user: idUser,id_product: idProduct}).from("cart")
            return {status: true, msg: "Produto Deletado Do Carrinho"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha em Remover Produto do Carrinho"}

        }

    }

}



module.exports = new Cart()