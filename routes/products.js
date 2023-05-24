var express = require('express');
var router = express.Router();

const {ValidateProduct} =require("./../middleware/productValidation")
const {productPagination} =require("./../middleware/productPagination")

const upload =require("./../middleware/upload")

// Import the functions from ProductControllers
const {index,show,store,update,patch,search,searchBySegment, uploadImages,paginate,del}= require('./../controllers/productController')



/* GET home page. */
router.get('/', async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    if (page && limit) {
      await productPagination(req, res, next);
      return paginate(req, res, next);
    } else {
      return index(req, res, next);
    }
  });

//GET  search by product  this route is static put it in the top
router.get('/search', search);

//search with params
router.get('/search/:segment', searchBySegment);

//GET  search by product  this route is dynamic put it in the bottom
router.get('/:id', show);

// put product
router.put('/:id',[upload.single('thumbnail'),ValidateProduct], update);

// patch product
router.patch('/:id',[upload.single('thumbnail'),ValidateProduct], patch);

// post product
router.post('/',[upload.single('thumbnail'),ValidateProduct], store);


// put image
router.put('/:id/images',[upload.array('images')], uploadImages);

router.delete('/:id',del);

module.exports = router;
