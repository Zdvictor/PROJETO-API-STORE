const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser") 

const path = require("path")

app.use(cors())
app.use(cookieParser())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const Routes = require("../routes/routes")

Routes.forEach((route) => {
    
    app.use(route)

})




module.exports = app