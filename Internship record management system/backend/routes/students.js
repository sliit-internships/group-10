const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();

// @route   POST api/students/registerStudent
// @desc    POST register new student
// @access  Private
router.post('/registerStudent', (req, res) => {
    const email = req.body.email;
    const studentIdNumber = req.body.studentIdNumber;
    const currentYear = req.body.currentYear;
    const Year2CompletionYear = req.body.Year2CompletionYear;
    const Year2CompletionPeriod = req.body.Year2CompletionPeriod;
    const sepcialization = req.body.sepcialization;
    const name = req.body.name;
    const mobile = req.body.mobile;
    const homePhone = req.body.homePhone;
    const internshipStartDate = req.body.internshipStartDate;
    const supervisorEmail = req.body.supervisorEmail;

    db.query(`SELECT id FROM users WHERE email = '${email}'`, (err, result) => {
        if(err) throw err;
        if (result.length>0){
            let student = [result[0].id, studentIdNumber, currentYear, Year2CompletionYear, Year2CompletionPeriod, sepcialization, name, mobile, homePhone, internshipStartDate, supervisorEmail];
            let sql = 'INSERT INTO students (sid, studentIdNumber, currentYear, Year2CompletionYear, Year2CompletionPeriod, sepcialization, name, mobile, homePhone, internshipStartDate, supervisorEmail ) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
            db.query(sql, student, (err, result) => {
                if(err) throw err;
                console.log(result);
                res.send(result);
            });  
        } 
    });  
    
    if(supervisorEmail){
        async function main() {
          
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.sendgrid.net",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: process.env.EMAILNODE_USER, // generated ethereal user
                pass: process.env.EMAILNODE_PASSWORD, // generated ethereal password
              },
              tls: {
                  rejectUnauthorized: false
              }
            });

            db.query(`SELECT id FROM users WHERE email = '${supervisorEmail}' AND usertype = "supervisor"`, async (err, result) => {
              if(err) throw err;
              if (result.length>0){
                 // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"SLIIT Internships" <it18195262@my.sliit.lk>',
                  to: supervisorEmail, // list of receivers
                  subject: `Supervisor Login, Student - ${name}`, // Subject line
                  text: "Hello world?", // plain text body
                  html: "<b>Please fill the forms related to the student's internship</b> <br/> <a href='http://localhost:3000/login'>Supervisor Login</a>", // html body
                });
                
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              } else {
                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"SLIIT Internships" <it18195262@my.sliit.lk>',
                  to: supervisorEmail, // list of receivers
                  subject: `Supervisor Registration, Student - ${name}`, // Subject line
                  text: "Hello world?", // plain text body
                  html: "<b>Please fill the forms and register as a supervisor</b> <br/> <a href='http://localhost:3000/'>Supervisor Registration</a>", // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              }
            });  
          }
          
          main().catch(console.error);
    }
})

// @route   GET api/students/getStudent/:email
// @desc    Get student by email
// @access  Private
router.get('/getStudent/:email', (req, res) => {
  let fetchId = `SELECT id FROM users WHERE email = '${req.params.email}'`;
  db.query(fetchId, (err, result) => {
    if(err) throw err;
    let sql = `SELECT * FROM students WHERE sid = '${result[0].id}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });  
  });  
})

module.exports = router