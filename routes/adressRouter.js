const express = require("express")
const router = express.Router()

const AdressController = require("../controllers/AdressController")

const AuthMiddleware = require("../middlewares/auth")

router.post("/adress", AuthMiddleware, AdressController.adress)
router.put("/adress", AuthMiddleware, AdressController.update)
router.delete("/adress/:id", AuthMiddleware, AdressController.delete)


module.exports = router