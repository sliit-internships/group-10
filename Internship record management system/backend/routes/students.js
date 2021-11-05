const express = require('express')
const router = express.Router()

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
            let sql = 'INSERT INTO students (sid, studentIdNumber, currentYear, 2ndYearCompletionYear, 2ndYearCompletionPeriod, sepcialization, name, mobile, homePhone, internshipStartDate, supervisorEmail ) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
            db.query(sql, student, (err, result) => {
                if(err) throw err;
                console.log(result);
                res.send(result);
            });  
        } 
    });   
})

module.exports = router