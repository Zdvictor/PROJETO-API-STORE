

class HomeController {

    async index(req,res) {

        res.send
        (
            `Olá e Bem-vindo à API da Shirt Store! 🎉 Estou empolgados em tê-lo aqui!
            Esta API foi projetada para oferecer uma experiência suave e intuitiva.
            Se você encontrar algum bug ou tiver dúvidas sobre como integrar ou consumir
            a API no front-end, não hesite em entrar em contato comigo. Estou aqui para ajudar!
            Explore os recursos disponíveis e aproveite a experiência de criar algo incrível com a Shirt Store!
            GITHUB DOC: https://github.com/Zdvictor`
        )
    }

}

module.exports = new HomeController()