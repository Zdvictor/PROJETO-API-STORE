require('dotenv').config();

const knex = require("knex") ({

    client: "mysql",
    connection: {

        user: process.env.SERVER_USER,
        password: process.env.SERVER_PASSWORD,
        host: process.env.SERVER_HOST,
        database: process.env.SERVER_DATABASE,
        timezone: 'America/Sao_Paulo'

    },


})


module.exports = knex