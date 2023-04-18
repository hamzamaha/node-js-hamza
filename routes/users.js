var express = require('express');
var router = express.Router();

// Import the functions from UsrControllers
const {index,register,login}= require('./../controllers/userController')

/* GET users listing. */
router.get('/', index );

/* POST register a users  */
router.post('/register', register );


/* POST login a users  */
router.post('/login', login );

module.exports = router;
