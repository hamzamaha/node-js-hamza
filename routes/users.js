var express = require('express');
var router = express.Router();

const {ValidateRegisterUser,ValidateLoginUser} =require("./../middleware/userValidation")
const { checkLoginAttempts } = require("./../middleware/loginAttempts");

// Import the functions from UsrControllers
const {index,register,login,userOrder,del}= require('./../controllers/userController')

/* GET users listing. */
router.get('/', index );

/* POST register a users  */
router.post('/register',[ValidateRegisterUser], register );


/* POST login a users  */
router.post('/login',[checkLoginAttempts,ValidateLoginUser], login );

router.get('/:id/order', userOrder );

router.delete('/:id', del );

module.exports = router;
