const nodemailer = require("nodemailer")
require('dotenv').config();

module.exports =  function mailer(name,email,recoveryCode) {


        const createTransport =  nodemailer.createTransport({

            service: "gmail",
            auth: {

                user: process.env.EMAIL_MAILER,
                pass: process.env.PASS_MAILER

            }

        })

        const mailOptions = {

            from: "Shirt Store <usuario@gmail.com>",
            to: email,
            subject: "Recuperação de Senha - Shirt Store",
            html: `

            <div style="background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                <h1 style="color: #333;">Recuperação de Senha</h1>
                <p>Olá, ${name}</p>
                <p>Você solicitou a recuperação da sua senha na <strong>Shirt Store</strong>.</p>
                <p>Use o código abaixo para redefinir sua senha:</p>
                <h2 style="background-color: #4CAF50; color: white; padding: 10px 20px; display: inline-block;">${recoveryCode}</h2>
                <p>Se você não solicitou essa alteração, por favor, ignore este e-mail.</p>
                <p>Atenciosamente,</p>
                <p><strong>Shirt Store</strong></p>
            </div>


            


            `
        }


         createTransport.sendMail(mailOptions, function(err, info) {

            if(err) {

                console.log("ERRO " + err)

            }else {

                // console.log("Email Sent " + info.response)

            }

        })

    }