module.exports = function(app){
    //Teacher Route....
    const teacher = require("./Teacher/teacherRoute")
    app.use("/api/v1/teacher",teacher)

}