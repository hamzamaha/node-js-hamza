var express = require('express');
var router = express.Router();

const {ValidateRegisterUser,ValidateLoginUser} =require("./../middleware/userValidation")


// Import the functions from UsrControllers
const {index,register,login}= require('./../controllers/userController')

/* GET users listing. */
router.get('/', index );

/* POST register a users  */
router.post('/register',[ValidateRegisterUser], register );


/* POST login a users  */
router.post('/login',[ValidateLoginUser], login );

module.exports = router;
