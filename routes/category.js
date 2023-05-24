var express = require('express');
var router = express.Router();

const {ValidateCategory} =require("./../middleware/categoryValidation")


// Import the functions from UsrControllers
const {index,show,store,update,patch,del}= require('../controllers/categoryController')


/* GET home page. */
router.get('/', index);

router.get('/:id', show);

// put product
router.put('/:id',[ValidateCategory], update);

// patch product
router.patch('/:id',[ValidateCategory], patch);

// post product
router.post('/',[ValidateCategory], store);

router.delete('/:id',del);

module.exports = router;
