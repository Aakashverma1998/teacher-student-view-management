const {check, validationResult} = require("express-validator");
exports.validateTeacher = [
    check("name").trim().not().isEmpty().withMessage("name is required...!"),
    check("email").trim().not().isEmpty().withMessage("email is required..!").normalizeEmail().isEmail().withMessage("Invalid Email.!"),
    check("password").trim().not().isEmpty().withMessage("password is required..!").isLength({min:8,max:20}).withMessage("Password must be 8 to 20 characters long.!"),
    check("age").trim().not().isEmpty().withMessage("age is required..!")
]
module.exports.validateteacher = [
    check("email").trim().not().isEmpty().withMessage("Email is required...!").normalizeEmail().isEmail().withMessage("Please enter correct email..!"),
    check("password").trim().not().isEmpty().withMessage("Password is required..!").isLength({min:8}).withMessage("Please enter correct password..!"),
]
exports.validateStudent = [
    check("name").trim().not().isEmpty().withMessage("name is required...!"),
    check("email").trim().not().isEmpty().withMessage("email is required..!").normalizeEmail().isEmail().withMessage("Invalid Email.!"),
    check("phone").trim().not().isEmpty().withMessage("password is required..!").isLength({min:8,max:20}).withMessage("Password must be 8 to 20 characters long.!"),
    check("age").trim().not().isEmpty().withMessage("age is required..!"),
    check("email_Time").trim().not().isEmpty().withMessage("email_Time is required..!")
]


exports.teacherValidation = (req,res, next)=>{
    const result = validationResult(req).array()
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({status:400, message:error})
}
exports.studentValidation = (req,res, next)=>{
    const result = validationResult(req).array()
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({status:400, message:error})
}