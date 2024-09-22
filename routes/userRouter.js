const express = require("express")
const router = express.Router()

const UserController = require("../controllers/UserController")

const upload = require("../services/multer/multer")

//PROTEGER
const AuthMiddleware = require("../middlewares/auth")


router.get("/my_profile", AuthMiddleware, UserController.profile)
router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.post("/upload_user/:id",AuthMiddleware, upload.single("image"), UserController.upload)
router.put("/user", AuthMiddleware, UserController.update)
router.delete("/user", AuthMiddleware, UserController.delete)



//CONFIGURAR MIDDLEWARE PARA NAO ALTERAR USUARIO QUE NAO TEM O MESMO ID OU NAO PERTENCE AO USUARIO OU TAREFA QUE SO ADMINISTRADOR PODE FAZER
//CRIAR UM PROFILE UMA NOVA ROTA AQUI PROFILE NELA RETORNARA OS DADOS EM COOKIES DO JWT 

module.exports = router