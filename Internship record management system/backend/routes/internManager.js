const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users online...')
})

// @route   GET api/users/intern-manager
// @desc    GET Intern manager
// @access  Private
router.get('/getInternManager', (req, res) => {
    let fetchId = "SELECT id FROM users WHERE usertype = 'intern manager'";
    db.query(fetchId, (err, result) => {
      if(err) throw err;
      if(result.length > 0){
        res.send(result);
      } else{
        res.send({message: 'No intern manager'});
      }  
    });  
})

module.exports = router