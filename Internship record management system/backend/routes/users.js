const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.send('users online...')
})

// @route   POST api/users/register
// @desc    POST register new user
// @access  Public
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const usertype = req.body.usertype;

    db.query(`SELECT id FROM users WHERE email = '${email}'`, (err, result) => {
        if(err) throw err;
        if (result.length>0){
            res.send({message: "Email already in use"});
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {

                if(err){
                    console.log(err);
                    res.send({ message: err.message });
                }
                let user = [email, hash, usertype];
                let sql = 'INSERT INTO users (email, password, usertype) VALUES (?,?,?)';
                db.query(sql, user, (err, result) => {
                    if(err) throw err;
                    console.log(result);
                    res.send(result);
                });  
            })
        }
    });   
})

// @route   POST api/users/login
// @desc    POST user login
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, email, (err, result) => {
        if(err){
            res.send({err: err});
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response){
                    //req.session.user = result;
                    //console.log(req.session.user);
                    res.send(result);
                }else{
                    res.send({message: 'Wrong email or password!'});
                }
            })
        }else{
            res.send({message: "User doesn't exsit"});
        }
    });  
})

module.exports = router