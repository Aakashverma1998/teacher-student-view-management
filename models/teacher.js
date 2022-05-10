const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    age: {type: String}
}, {
    timestamps: true
})
module.exports = Teacher = mongoose.model("Teacher", teacherSchema)