const Products = require("../models/Products")
const ProductsValidator = require("../validators/products")

//ID ADM
const adm = 123

class ProductsController {

    async all(req,res) {

        const result = await Products.AllProducts()

        if(result.status) {

            res.json({products: result.products})
            
        }else {

            res.status(500).json({err: result.err})

        }

    }

    async register(req,res) {

        const {name,description,price} = req.body
        

        if(req.user.id !== adm) {

            return res.status(403).json({err: "Somente Administradores Podem Registrar Novos Produtos!"})

        }

        const validator = ProductsValidator.validator(name,description)

        if(!validator.status) {

            return res.status(400).json({err: result.err})

        }
        

        const result = await Products.SaveProducts(name,description,price)

        if(result.status) {

            res.json({msg: result.msg, id: result.id})

        }else {

            res.status(500).json({err: result.err})
            
        }



    }

    async update(req,res) {

        const id = req.params.id


        if(req.user.id !== adm) {

            return res.status(403).json({err: "Somente Administradores Podem Atualizar Produtos!"})

        }
        

        if(isNaN(id)) {

            return res.status(400).json({err: "Id invalido"})
            
        }

        const {name,description,price,image} = req.body

        const validator = ProductsValidator.validator(name,description)

        if(!validator.status) {

            return res.status(400).json({err: validator.err})
 
        }


        const result = await Products.EditProducts(id,name,description,price,image)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(400).json({err: result.err})

        }



    }

    async delete(req,res) {

        const id = req.params.id

        if(req.user.id !== adm) {

            return res.json(403).json({err: "Somente Administradores Podem Apagar Produtos!"})

        }
        

        const result = await Products.removeProducts(id)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(500).json({err: result.err})

        }

        

    }

    async upload(req,res) {

        const id = req.params.id


        if(req.user.id !== adm) {

            return res.status(403).json({err: "Somente Administradores Podem Alterar Fotos de Produtos!"})

        }        

        const imagePath = req.file.path
        const path = imagePath.split('\\').pop()

        const result = await Products.UploadImage(id,path)

        if(result.status) {

            res.json({msg: result.msg, file: path})

        }else {

            res.status(500).json({err: result.err})

        }


    }


}


module.exports = new ProductsController()