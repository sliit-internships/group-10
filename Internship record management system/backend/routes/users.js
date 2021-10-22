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

    
    bcrypt.hash(password, saltRounds, (err, hash) => {

        if(err){
            console.log(err);
        }
        let user = [email, hash, usertype];
        let sql = 'INSERT INTO users (email, password, usertype) VALUES (?,?,?)';
        db.query(sql, user, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(result);
        });  
    })
})

module.exports = router