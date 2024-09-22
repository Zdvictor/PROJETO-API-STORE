const homeRouter = require("./homeRouter")
const userRouter = require("./userRouter")
const recoveryRouter = require("./recoveryRouter")
const adressRouter = require("./adressRouter")
const productsRouter = require("./productsRouter")
const cartRouter = require("./cartRouter")
const paymentRouter = require("./paymentRouter")

module.exports = [

    homeRouter,
    userRouter,
    recoveryRouter,
    adressRouter,
    productsRouter,
    cartRouter,
    paymentRouter

]