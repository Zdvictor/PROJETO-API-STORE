const app = require("../src/index")
const supertest = require("supertest")
const request = supertest(app)
const knex = require("../database/database")



jest.setTimeout(60000)


describe("Descrição de Pedidos", () => {

    var id = undefined 

    var product = {

        idUser: 123,
        idProduct: 31,


    }

    var user = {

        email: "vitinvictor010@gmail.com",
        password: "AdmLoja123."
   }

   
    var token;

    test("Deve Logar um Usuario",  async () => {
    
        await request.post("/login")
        .send({email: user.email, password: user.password})
        .then((res) => {

            token = res.body.token
            expect(res.body.msg)

        .toEqual("Usuario Autenticado com Sucesso")
    })
        
        
    
    })


    test("Deve Criar um Pedido", async () => {

        await request.post("/create_payment")
        .send(
        {   

            idUser: product.idUser,
            idProduct: product.idProduct,

        }
    )
    .set("Cookie", [`token=${token}`])
    .then(res => {
     id = res.body.id
    expect(res.body.msg)
    .toEqual("Pedido Criado com Sucesso")})
    })


    test("Deve Cancelar um Pedido", async () => {

        await request.post(`/cancel_payment/${id}`)
        .set("Cookie", [`token=${token}`])
        .then(res => expect(res.body)
        .toEqual("Pedido Cancelado com Sucesso"))
     })


    test("Deve Deletar um Pedido", async () => {

        await request.delete(`/delete_payment/${id}`)
        .set("Cookie", [`token=${token}`])
        .then(res => expect(res.body)
        .toEqual("Pedido Deletado com Sucesso"))
    })

    
    afterAll(async () => {

        await knex.destroy();

    })


})