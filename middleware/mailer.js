const sgMail = require('@sendgrid/mail');
const dotenv = require("dotenv").config();
const cron = require('node-cron')

module.exports.sendAddStudentMail = async (studentData) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to:process.env.STUDENT_MAIL,
        from: {
            "email": process.env.TEACHER_MAIL,
            "name": 'Teacher'
        },
        subject: 'Student register mail.',
        html:`<strong> THIS IS STUDENT DETAILS CREATED BY TEACHER.</strong> <br>
        <table>

        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
        <tr>
            <td>${studentData.name}</td>
            <td>${studentData.email}</td>
            <td>${studentData.phone}</td>
        </tr>
        </table>
    `
    }
    try{
        cron.schedule('1-5 * * * * *', async()=>{
            const result = await sgMail.send(msg)
        })
         
    }catch(err){
        console.log(err);
    }
    

}
