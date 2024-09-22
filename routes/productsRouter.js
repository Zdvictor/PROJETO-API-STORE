const express = require("express")
const router = express.Router()

const ProductsController = require("../controllers/ProductsController")

const upload = require("../services/multer/multer")

const AuthMiddleware = require("../middlewares/auth")

router.get("/products", ProductsController.all)
router.post("/products", AuthMiddleware, ProductsController.register)
router.post("/upload_product/:id", AuthMiddleware, upload.single("image"), ProductsController.upload)
router.put("/products/:id",  AuthMiddleware,  ProductsController.update)
router.delete("/products/:id", AuthMiddleware, ProductsController.delete)


module.exports = router