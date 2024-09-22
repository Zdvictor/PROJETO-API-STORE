const app = require("../src/index")
const supertest = require("supertest")
const request = supertest(app)
const {cpf} = require("cpf-cnpj-validator")
const knex = require("../database/database")

jest.setTimeout(60000)


describe("Descricao de todos os testes de cadastros",  () => {

    const num = cpf.generate()

    var user = {

        name: "jestTest",
        cpf: num,
        email: `${Date.now()}@teste.com`,
        password: "JestPassword12."
    
    }

    var token;
    

    test("Deve ver se o Servidor esta rodando na porta 8080",   async () => {

        await request.get("/")
        .then((res) => expect(res.status)
        .toEqual(200))
        
    
    })
    
    test("Deve Cadastrar um Usuario",  async () => {
    
        await request.post("/register")
        .send({name: user.name, cpf: user.cpf, email: user.email, password: user.password})
        .then((res) => expect(res.body.msg)
        .toEqual("Usuario Cadastrado Com Sucesso"))
        
        
    
    })
    
    test("Deve Verificar se Nao Cadastra Usuarios Duplicados", async () => {
    
        await request.post("/register")
        .send({name: user.name, cpf: user.cpf, email: user.email, password: user.password})
        .then((res) => {
            
            expect(
            
            res.body.err === "O Email ja Esta Cadastrado" || 
            res.body.err === "O Cpf ja Esta Cadastrado" || 
            res.body.err === "Usuario Nao Cadastrado"
    
        ).toBe(true)
    })
    
    
        
        
    
    })

    test("Deve Retornar Token JWT no Register", async () => {
    
        await request.post("/register")
        .send({name: user.name, cpf: user.cpf, email: user.email, password: user.password})
        .then((res) => expect(res.body.token !== "").toBe(true))
    
    
        
    
    })
    
    test("Deve Logar um Usuario",  async () => {
    
        await request.post("/login")
        .send({email: user.email, password: user.password})
        .then((res) => {

            token = res.body.token
            expect(res.body.msg)

        .toEqual("Usuario Autenticado com Sucesso")
    })
        
        
    
    })
    
    test("Deve Retornar Token JWT no Login",  async () => {
    
        await request.post("/login")
        .send({email: user.email, password: user.password})
        .then((res) => expect(res.body.token !== "").toBe(true))
    
        
    
    })
    
    test("Deve Atulizar um Usuario", async () => {
    
    
        var newUser = {
    
            name: "jestUpdate",


    
        }
    
        await request.put("/user")
        .set("Cookie", [`token=${token}`])
        .send({emailAtual: user.email, name: newUser.name})
        .then(async res => 
        {
    
        expect(res.body)
        .toEqual("Usuario Atualizado com Sucesso")
    
        await request.put("/user")
        .send({emailAtual: newUser.email, name: user.name})
    
        })
    
    
    
    
     })

     test("Deve Deletar um Usuario", async () => {

        await request.delete("/user")
        .set("Cookie", [`token=${token}`])
        .send({email: user.email})
        .then(res => expect(res.body)
        .toEqual("Usuario Deletado")
        )
        
     })

     afterAll(async () => {

        await knex.destroy();

    })

})






