const app = require("../src/index")
const supertest = require("supertest")
const request = supertest(app)
const knex = require("../database/database")



jest.setTimeout(60000)


describe("Descrição de Endereços", () => {


    var adress = {

        idUser: "123",
        number: "70",
        neighborhood: "Bairro Teste",
        street: "Rua Teste",
        city: "Cidade Teste",
        state: "SP",
        cep: "13444899"

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

    test("Deve Adicionar um Endereço", async () => {

        await request.post("/adress")
        .send(
        {
            idUser: adress.idUser,
            number: adress.number,
            neighborhood: adress.neighborhood,
            street: adress.street,
            city: adress.city,
            state: adress.state,
            cep: adress.cep
        }
    )
    .set("Cookie", [`token=${token}`])
    .then(res => {
    expect(res.body.msg)
    .toEqual("Endereço Adicionado Com Sucesso")})

    })


    test("Deve Atualizar um Endereço", async () => {

        await request.put("/adress")
        .send(
        {
            idUser: adress.idUser,
            number: 30
        }
    )
    .set("Cookie", [`token=${token}`])
    .then(res => {
    expect(res.body.msg)
    .toEqual("Endereço Atualizado Com Sucesso")})
    })



    test("Deve Deletar um Endereço", async () => {

        await request.delete(`/adress/${adress.idUser}`)
        .set("Cookie", [`token=${token}`])
        .then(res => expect(res.body)
        .toEqual("Endereço Removido com Sucesso")) 

    })

    afterAll(async () => {

        await request.post("/adress")
        .send(
        {
            idUser: adress.idUser,
            number: adress.number,
            neighborhood: adress.neighborhood,
            street: adress.street,
            city: adress.city,
            state: adress.state,
            cep: adress.cep
        }
    )
        .set("Cookie", [`token=${token}`])
        .then(res => {
        expect(res.body.msg)
        .toEqual("Endereço Adicionado Com Sucesso")})

        
        await knex.destroy();
    

    })



})