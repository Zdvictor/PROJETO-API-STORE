

class ProductsValidator {


     validator(name,description) {

        var resultName = this.name(name)
        var resultDescription = this.description(description)

        if(!resultName.status) {

            return {status: false, err: resultName.msg}

        }

        else if(!resultDescription.status) {

            return {status: false, err: resultDescription.msg}

        }

        return {status: true, msg: "Dados com Sucesso"}

    }

     name(name) {

        var n = name
        var qtdLength = n.length

        if(n == null || n == undefined || n == " " || n == "  " || n.length < 4) {

            return {status: false, msg: "Nome Invalido"}

        }

        for(var i = 0; i < qtdLength; i++) {

            if(Number(n[i])) {

                return {status: false, msg: "Nome Invalido"}

            }

            return {status: true, msg: "Nome Valido"}

        }

    }

     description(description) {

        var d = description

        if(d == null || d == undefined || d == " " || d == "  " || d.length < 10) {

            return {status: false, msg: "Descricao Invalida"}

        }

        return {status: true, msg: "Descricao Valida"}

    }
    
    

}


module.exports = new ProductsValidator()