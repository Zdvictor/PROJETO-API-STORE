const express = require("express")
const router = express.Router()

const RecoveryController = require("../controllers/RecoveryController")


router.post("/recovery", RecoveryController.recovery)
router.post("/verify_code", RecoveryController.verify)
router.put("/change_password", RecoveryController.change)

module.exports = router