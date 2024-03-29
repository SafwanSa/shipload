const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const s3 = new aws.S3();

/* In case you want to validate your file type */
const fileFilter = (req, file, cb) => {
 if (true) {
  cb(null, true);
 } else {
  cb(new Error('Wrong file type, only upload JPEG and/or PNG !'), 
  false);
 }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    key: function(req, file, cb) {
      req.file = `${Date.now()}-${file.originalname}`;
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

module.exports = upload;