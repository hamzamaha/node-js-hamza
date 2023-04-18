var express = require('express');
var router = express.Router();

// Import the functions from UsrControllers
const {index,show,store,update,patch,search,searchBySegment}= require('./../controllers/productController')



/* GET home page. */
router.get('/', index);

//GET  search by product  this route is static put it in the top
router.get('/search', search);

//search with params
router.get('/search/:segment', searchBySegment);

//GET  search by product  this route is dynamic put it in the bottom
router.get('/:id', show);

// put product
router.put('/:id', update);

// patch product
router.patch('/:id', patch);

// post product
router.post('/', store);

module.exports = router;
