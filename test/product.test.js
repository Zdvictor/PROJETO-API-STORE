const app = require("../src/index")
const supertest = require("supertest");
const request = supertest(app)
const knex = require("../database/database")



jest.setTimeout(60000)

describe("Descricao de Produtos",  () => {

    var user = {

         email: "vitinvictor010@gmail.com",
         password: "AdmLoja123."
    }

    var product = {

        name: "Jersey Brasil Neymar JR 10",
        description: "Camisa da Seleção Brasileira a maior campeã mundial venha adquirir a melhor camisa com tecido de alta qualidade",
        price: 100,
    }
    var idProduct
    var token

    test("Deve Logar um Usuario",  async () => {
    
        await request.post("/login")
        .send({email: user.email, password: user.password})
        .then((res) => {

            token = res.body.token
            expect(res.body.msg)

        .toEqual("Usuario Autenticado com Sucesso")
    })
        
        
    
    })


    test("Deve Retornar Todos Produtos Da Tabela", async () => {

        await request.get("/products")
        .then(res => expect(res.body.products.length > 0)
        .toBe(true))

    })

    test("Deve Cadastrar um Produto Na Tabela", async () => {

        await request.post("/products")
        .set("Cookie", [`token=${token}`])
        .send(
            {
             name: product.name,
             description: product.description,
             price: product.price,
            }
        )
        .then(res => { 
         idProduct = res.body.id
         expect(res.body.msg)
        .toEqual("Produto Cadastrado com Sucesso")})
        
    
    })

    test("Deve Atualizar um Produto Na Tabela" , async () => {

        await request.put(`/products/${idProduct}`)
        .set("Cookie", [`token=${token}`])
        .send(
            {
             name: "Jersey Brasil Neymar JR 10 THE GOAT",
             description: "Camisa da Seleção Brasileira a maior campeã mundial venha adquirir a melhor camisa com tecido de alta qualidade",
             price: 180,
            }
        )
        .then(async res => {

         expect(res.body)
        .toEqual("Produto Atualizado com Sucesso")


        await request.put(`/products/${idProduct}`)
        .send({

            name: product.name,
            description: product.description,
            price: product.price,

        })

            
        }
      )




    })

    test("Deve Deletar o Prdouto", async () => {

        await request.delete(`/products/${idProduct}`)
        .set("Cookie", [`token=${token}`])
        .then(res => expect(res.body)
        .toEqual("Produto Deletado Com Sucesso"))

    })

    afterAll(async () => {

        await knex.destroy();

    })


})

