const Cart = require("../models/Cart")

class CartController {

    async index(req,res) {

        const id = req.params.id

        if(req.user.id !== Number(id)) {

            return res.status(403).json({err: "Não e Possivel Ver Carrinho de Outra Pessoa!"})

        }     

        const result = await Cart.ViewProduct(id)

        if(result.status) {

            res.json({msg: result.msg, products: result.products})

        }else {

            res.status(500).json({err: result.err, products: result.products})
            
        }

    }

    async register(req,res) {

        const {idUser, idProduct} = req.body

        if(req.user.id !== Number(idUser)) {

            return res.status(403).json({err: "Não e Possivel Inserir Produtos no Carrinho Para outros Usuarios!"})

        }  

        const result = await Cart.RegisterProduct(idUser, idProduct)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(500).json({err: result.err})

        }


    }

    async delete(req,res) {

        const {idUser, idProduct} = req.body

        if(req.user.id !== Number(idUser)) {

            return res.status(403).json({err: "Não e Possivel Inserir Produtos no Carrinho Para outros Usuarios!"})

        }  

        var result = await Cart.DeleteProduct(idUser,idProduct)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(500).json(result.err)

        }
    }

}


module.exports = new CartController()