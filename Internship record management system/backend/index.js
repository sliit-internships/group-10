const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000 || process.env.PORT;

//routes
const users = require('./routes/users');

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

//routes
app.use('/api/users', users)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})