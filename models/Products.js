
const knex = require("../database/database")


class Products {


    async AllProducts() {

        try {

            var products = await knex("products").select("*")

            if(products.length > 0) {

                return {status: true, products: products}

            }else {

                return {status: false, err: "Lista de Produtos Vazia"}

            }


        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha ao listar Produtos"}

        }

    }
    
    async SaveProducts(name,description,price) {

        try {
            
            var idProduct

            var result = await knex.insert({name,description,price}).into("products") 

            result.map((id) => {idProduct = id})
        
            return {status: true, msg: "Produto Cadastrado com Sucesso", id: idProduct}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha no Cadastro"}

        }

    }

    async findProductsById(id) {

        try {

            var result = await knex.select("*").where({id}).table("products")

            if(result.length > 0) {

                return {status:true, msg: "Produto Existe no Banco de Dados"}

            }

            return {status: false, err: "Produto Não Existe no Banco de Dados"}




        }catch(err) {

            console.log(err) 
            return {status: false, err: "Falha no Servidor"}

        }

    }

    async EditProducts(id,name,description,price,image) {

        try {

            var existProduct = await this.findProductsById(id)

            if(!existProduct.status) {

                return {status: false, err: "Não Existe Produto com Esse ID"}

            }

            var result = await knex.update({

                name,
                description,
                price,
                image

            }).where({id}).table("products")

            return {status: true, msg: "Produto Atualizado com Sucesso"}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha Na Atualização"}

        }

    }

    async removeProducts(id) {

        try {

        var existProduct = await this.findProductsById(id)

        if(!existProduct.status) {

            return {status: false, err: "Não Existe Produto com Esse ID"}

        }

        var result = await knex.delete().where({id}).from("products")

        return {status: true, msg: "Produto Deletado Com Sucesso"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha na Remoção"}

        }
    }

    async UploadImage(id,path) {

        try {

            var result = await knex("products").update({

                image: path

            }).where({id})


            return {status: true, msg: "Imagem Salva com Sucesso"}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Falha em Salvar a Imagem"}

        }

    }

}


module.exports = new Products()