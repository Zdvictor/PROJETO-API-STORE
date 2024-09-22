const Adress = require("../models/Adress")
const AdressValidator = require("../validators/adress")


class AdressController {

    async adress(req,res) {

        const {idUser, number,neighborhood,street,city,state,cep} = req.body

        if(req.user.id !== Number(idUser)) {

            return res.status(403).json({err: "Não e Possivel Adicionar Endereço para Outro Usuario!"})

        }  
        
        const AdressIsValid = await AdressValidator.verify(number,neighborhood,street,city,state,cep)

        if(!AdressIsValid) {

            return res.status(400).json({err: "Dados Inválidos Verifique Se Não Tem Campo Vazio ou CEP Inválidos"})

        }

        const result = await Adress.AddAdress(idUser, number,neighborhood,street,city,state,cep)

        if(result.status) {

            res.json({msg: result.msg, idAdress: result.id})

        }else {

            res.status(500).json({err: result.err})

        }

    }

    async update(req,res) {

        const {idUser, number,neighborhood,street,city,state,cep} = req.body

        if(req.user.id !== Number(idUser)) {

            return res.status(403).json({err: "Não e Possivel Atualizar Endereço De Outro Usuario!"})

        }  
        

        const result = await Adress.UpdateAdress(idUser, number,neighborhood,street,city,state,cep)

        if(result.status) {

            res.json({msg: result.msg, idAdress: result.id})

        }else {

            res.status(500).json({err: result.err})

        }

    }

    async delete(req,res) {

        const id = req.params.id

        if(req.user.id !== Number(id)) {

            return res.status(403).json({err: "Não e Possivel Remover Endereço De Outro Usuario!"})

        }  

        const result = await Adress.RemoveAdress(id)

        if(result.status) {

            res.json(result.msg)

        }else {

            res.status(500).json({err: result.err})

        }


    }

}

module.exports = new AdressController()