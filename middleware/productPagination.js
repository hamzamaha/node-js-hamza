const Product = require('./../models/product')


exports.productPagination = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items to show per page
    const startIndex = (page - 1) * limit; // starting index of items to show on the current page
  
    try {
      const products = await Product.find()
        .populate("category", "-_id label color icon")
        .skip(startIndex)
        .limit(limit);
  
      const totalCount = await Product.countDocuments(); // total number of products in the database
  
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      };
  
      res.pagination = pagination;
      res.products = products;
    //   next();
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };
  
