const jwt = require("jsonwebtoken")
require('dotenv').config();

const moment = require('moment-timezone');
require('moment/locale/pt-br');

moment.locale('pt-br');
const secret = process.env.JWT_SECRET

module.exports = function (result) {


    return jwt.sign(
        {
            id: result.data.id,
            name: result.data.name,
            cpf: result.data.cpf,
            email: result.data.email,
            endereco_id: result.data.endereco_id,
            registered: moment.utc(result.data.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss'),
            image: result.data.image,

        }
        , secret, {expiresIn: "24h"},)


}