const app = require("../src/index")
const supertest = require("supertest")
const request = supertest(app)
const knex = require("../database/database")


jest.setTimeout(60000)


describe("Descrição de Recuperação senha", () => {

    var email = "vitinvictor010@gmail.com"
    var code;

    test("Deve Receber um Codigo", async () => {

        await request.post("/recovery")
        .send(
        {
            email
        }
    )
    .then(res =>
     {  

        code = res.body.code

        expect(res.body.msg)
        .toEqual("Codigo Enviado Para o Email com Sucesso")}
    )
    })


    test("Deve Alterar a Senha", async () => {

        await request.put("/change_password")
        .send(
        {
            
            code,
            newPassword: "AdmLoja123."

        }
    )
    .then(res => expect(res.body.msg)
    .toEqual("Senha Alterada com Sucesso")) 

    })

    afterAll(async () => {

        await knex.destroy();

    })



})