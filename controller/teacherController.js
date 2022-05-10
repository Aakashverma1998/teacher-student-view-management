const Teacher = require('../models/teacher')
const Student = require('../models/student')
const bcrypt = require("bcryptjs")
const helper = require("../helper/helper")
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const mailer = require("../middleware/mailer")

module.exports = {
    register: async (req, res) => {
        try {
            let data = req.body;
            let hashedpassword = await bcrypt.hash(data.password, 10)
            let emailMatch = await Teacher.findOne({
                email: data.email
            });
            if (emailMatch) {
                return res.status(400).json({
                    message: "TEACHER EXIST"
                });
            }
            let addTeacher = Teacher({
                name: data.name,
                email: data.email,
                password: hashedpassword,
                age: data.age,
                email_Time: data.email_Time

            });

            let response = await addTeacher.save();
            return res.status(201).json({
                msg: "TEACHER REGISTER SUCCESSFULLY.",
                data: response
            });
        } catch (err) {
            console.log(err);
            return res.json(helper.showInternalServerErrorResponse("Internal server error"));
        };
    },
    login: async (req, res) => {
        try {
            let data = req.body
            let verifyData = await Teacher.findOne({
                email: data.email
            }, );
            if (verifyData) {
                let passwordMatch = await bcrypt.compare(data.password, verifyData.password);
                if (passwordMatch) {
                    let token = jwt.sign({
                        email: verifyData.email,
                        userId: verifyData._id
                    }, process.env.secret_key, {
                        expiresIn: "1h"
                    })
                    res.status(201).json({
                        message: "Login Success",
                        Teacher: verifyData,
                        token: token
                    });
                } else {
                    return res.json(helper.showvalidationErrorResponse("Password Is Wrong"));
                };
            } else {
                return res.json(helper.showvalidationErrorResponse("Email Is Wrong"));
            };
        } catch (err) {
            return res.json(helper.showInternalServerErrorResponse("Internal server error"));

        };
    },
    create: async (req, res) => {
        try {
            const data = new Student(req.body)
            let responseData = await data.save();
            //sending mail during add student by teacher.
            const mailResponse = await mailer.sendAddStudentMail(responseData);
            return res.status(201).json({
                msg: "STUDENT DATA SAVE SUCCESSFULLY.",
                data: responseData
            });
        } catch (err) {
            console.log(err);
            return res.json(helper.showInternalServerErrorResponse("Internal server error"));
        };
    },

    get: async (req, res) => {
        try {
            const pageSize = 10;
            const pageNumber = req.query.page || 0;
            const count = await Student.countDocuments();
            const results = await Student.find().skip(pageNumber * pageSize).limit(pageSize)
            res.status(200).json({
                message: "data fetched successfully..",
                page: pageNumber,
                size: pageSize,
                data: results,
               
                //total_count: count
            })
        } catch (err) {
            console.log(err);
            return res.json(helper.showInternalServerErrorResponse("Internal server error"));
        };
    }
}