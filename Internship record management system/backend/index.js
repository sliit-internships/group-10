const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000 || process.env.PORT;

//routes
const users = require('./routes/users');
const students = require('./routes/students');
const internManager = require('./routes/internManager')

//create db connection
db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'interndb'
});

//connect
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('My sql connected');
})

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//create Db
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE interndb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created');
    });
});

//create user table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(500), usertype VARCHAR(300), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created');
    });
})

//create student table
app.get('/createstudentstable', (req, res) => {
    let sql = 'CREATE TABLE students(sid int(255), studentIdNumber VARCHAR(25), currentYear VARCHAR(25), Year2CompletionYear VARCHAR(10), Year2CompletionPeriod VARCHAR(10), sepcialization VARCHAR(55), name VARCHAR(100), mobile VARCHAR(25), homePhone VARCHAR(25), internshipStartDate DATE, supervisorEmail VARCHAR(100), PRIMARY KEY(sid))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Students table created');
    });
})

//routes
app.use('/api/users', users);
app.use('/api/students', students);
app.use('/api/intern-manager', internManager);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})