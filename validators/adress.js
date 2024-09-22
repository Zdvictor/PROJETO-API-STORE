const cep = require("cep-promise")

class VerifyAdress {

    async verify(number,neigh,street,city,state,c) {

        if(number == null || number == undefined || number == "" || number == " " || number == "   ") {

            return false

        }

        if(neigh == null || neigh == undefined || neigh == "" || neigh == " " || neigh == "   ") {

            return false

        }

        if(street == null || street == undefined || street == "" || street == " " || street == "   ") {

            return false

        }

        if(city == null || city == undefined || city == "" || city == " " || city == "   ") {

            return false

        }

        if(state == null || state == undefined || state == "" || state == " " || state == "   ") {

            return false

        }

        if(c == null || c == undefined || c == "" || c == " " || c == "   ") {

            return false

        }

        
        try {

            var result = await cep(c)
            return true

        }catch(err) {

            console.log(err.message)
            return false 

        }


    }


}


module.exports = new VerifyAdress()