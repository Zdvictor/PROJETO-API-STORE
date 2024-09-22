const {CardToken, MercadoPagoConfig, Payment, PaymentMethod, Preference}  = require('mercadopago');
const PaymentModel = require("../models/Payment")
require('dotenv').config();

const token = process.env.MP_TOKEN

const client = new MercadoPagoConfig({
    
    accessToken: token

})

const payment = new Payment(client);

class PaymentController {

    async FindOrders(req,res) {

      const id = req.params.id

      if(req.user.id !== Number(id)) {

        return res.status(403).json({err: "Não e Possivel Procurar Pedidos De outros Usuarios!"})

    }      

      const result = await PaymentModel.FindAllOrders(id)

      if(result.status) {

        res.json(result.orders)

      }else {

        res.status(500).json({err: result.err})

      }

    }

    async Payment(req,res) {

      const {idUser,idProduct} = req.body


        if(req.user.id !== Number(idUser)) {

            return res.status(403).json({err: "Não e Possivel Criar Pedidos Para outros Usuarios!"})

        }      

      const haveAdress = await PaymentModel.HaveAdress(idUser)

      if(!haveAdress.status) {

        return res.status(500).json({err: haveAdress.err})

      }

      const objectData = await PaymentModel.FindDataForOrder(idUser, idProduct)
      
      const {email} = objectData.data
      const {price, description} = objectData.data.product


        const body = {

          transaction_amount: price,
          description: description,
          payment_method_id: "pix",
          payer: {
          
            email: email

          },
          
        }

        try {

          const result = await payment.create({body}) 

          const url = result.point_of_interaction.transaction_data.ticket_url

          const paymentDb = await PaymentModel.CreateOrder(result.id, idUser,idProduct,url)
          
          if(paymentDb.status) {
            
            res.json({msg: paymentDb.msg, id: result.id, result: url})

          }else {

            res.status(500).json({err: paymentDb.err})

          }

        }catch(err) {

          res.status(500).json({err: "Erro ao Criar o Pagamento"})
          console.log(err)

        }

    }

    async Cancel(req,res) {

      const id = req.params.id;

      try {

        const response = await payment.cancel({ id });
        const paymentDb = await PaymentModel.CancelOrder(id)
        
        if(paymentDb.status) {

          res.json(paymentDb.msg)

        }else {

          res.status(500).json({err: paymentDb.err})

        }

      } catch (err) {

        console.log(err)
        res.status(500).json({ err: "Pagamento Não Encontrado Para Ser Cancelado" });

      }

    }

    async Delete(req,res) {

      const id = req.params.id

      const result = await PaymentModel.DeleteOrder(id)

      if(result.status) {

        res.json(result.msg)

      }else {

        res.status(500).json(result.err)

      }

    }

    async Notification(req,res) {

      const { id } = req.body.data
      const action = req.body.action
      const type = req.body.type

      if(action == "payment.updated") {

        if(type == "payment") {

          var result = await PaymentModel.PaidOrder(id)

          if(result.status) {

            res.json("Pago Com Sucesso")
            

          }else {

            res.status(500).json({err: "Erro no Pagamento"})


          }

        }

      }

    }

    
}

module.exports = new PaymentController();
