// const multer=require('multer');
// const path=require('path');
// const crypto=require('crypto');

// // Disk Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads')
//   },
//   filename: function (req, file, cb) {
//    crypto.randomBytes(12,function(err,name){
//     const fn=name.toString('hex')+path.extname(file.originalname);
//     cb(null,fn);
// })
//   }
// })

// const upload = multer({ storage: storage })

// // Export Upload variable 
// module.exports=upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// create cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "postapp2/profile-pics",   // your project name folder
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

// multer upload middleware
const upload = multer({ storage });

module.exports = upload;
