const express = require("express")
const router = express.Router()

const CartController = require("../controllers/CartController")

const AuthMiddleware = require("../middlewares/auth")

router.get("/cart/:id", AuthMiddleware,  CartController.index)
router.post("/cart", AuthMiddleware, CartController.register)
router.delete("/cart", AuthMiddleware, CartController.delete)




module.exports = router