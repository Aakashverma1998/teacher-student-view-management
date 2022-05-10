const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    age: {type: String},
    email_Time:{type:String}
}, {
    timestamps: true
})
module.exports = Student = mongoose.model("Student", studentSchema)