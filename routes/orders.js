var express = require('express');
var router = express.Router();




// Import the functions from UsrControllers
const {index,store,patch}= require('../controllers/orderController')


/* GET home page. */
router.get('/', index);

// post product
router.post('/', store);


router.patch('/:id', patch);

module.exports = router;
