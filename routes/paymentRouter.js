const express = require("express")
const router = express.Router()
const PaymentController = require("../controllers/PaymentController")

const AuthMiddleware = require("../middlewares/auth")

router.get("/orders/:id", AuthMiddleware, PaymentController.FindOrders)
router.post("/create_payment", AuthMiddleware, PaymentController.Payment)
router.post("/cancel_payment/:id", PaymentController.Cancel)
router.delete("/delete_payment/:id", PaymentController.Delete)
router.post("/notification", PaymentController.Notification)


module.exports = router


