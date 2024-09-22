const app = require("../src/index")
const supertest = require("supertest")
const request = supertest(app)
const knex = require("../database/database")


jest.setTimeout(60000)


describe("Descrição de Carrinhos", () => {

    var product = {

        idUser: 123,
        idProduct: 31
        

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


    test("Deve Adicionar um Produto no Carrinho", async () => {

        await request.post("/cart")
        .send(
        {
            idUser: product.idUser,
            idProduct: product.idProduct
        }
    )
    .set("Cookie", [`token=${token}`])
    .then(res => expect(res.body)
    .toEqual("Produto Adicionado No Carrinho"))
    })

    test("Deve Retornar Carrinho do Usuario", async () => {

        await request.get(`/cart/${product.idUser}`)
        .then(res => expect(res.body.products !== null)
        .toBe(true))

    })


    test("Deve Deletar um Produto No Carrinho", async () => {

        await request.delete("/cart")
        .send(
        {
            
            idUser: product.idUser,
            idProduct: product.idProduct

        }
    )
    .set("Cookie", [`token=${token}`])
    .then(res => expect(res.body)
    .toEqual("Produto Deletado Do Carrinho")) 

    })


    afterAll(async () => {

        await knex.destroy();

    })


})