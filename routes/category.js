var express = require('express');
var router = express.Router();

// Import the functions from UsrControllers
const {index,show,store,update,patch}= require('../controllers/categoryController')


/* GET home page. */
router.get('/', index);

router.get('/:id', show);

// put product
router.put('/:id', update);

// patch product
router.patch('/:id', patch);

// post product
router.post('/', store);

module.exports = router;
