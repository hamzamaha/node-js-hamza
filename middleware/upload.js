const { error } = require('console')
const multer  = require('multer')
const path = require('path')


const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const ALLOWED_IMAGE={
            'image/png':'png',
            'image/jpeg':'jpeg',
            'image/jpg':'jpg'
        }
       let error=null
        if(!ALLOWED_IMAGE[file.mimetype]){
            error = new Error('FileError')
        }

      cb(error, `${__dirname}/../public/images`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })

  
  
  const upload = multer({ storage:storage })
  module.exports = upload;
  // module.exports= multer({ storage })