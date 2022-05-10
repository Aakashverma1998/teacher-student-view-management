const router = require("express").Router()
const {register,login,create,get} = require("../../controller/teacherController")
const auth = require("../../middleware/auth")
const {validateTeacher,teacherValidation, validateteacher,studentValidation,validateStudent} = require("../../middleware/validation")

router.post("/signup",validateTeacher,teacherValidation,register)
router.post("/login",validateteacher,teacherValidation,login)
router.post("/addStudent",auth,validateStudent,studentValidation,create)
router.get("/studentPagination",get)

module.exports = router