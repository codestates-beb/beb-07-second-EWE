const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { getCurrentTokenId } = require('../chainUtils/nftUtils');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

const nftUpload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async (req, file, cb) => {
      const currentTokenId = await getCurrentTokenId();
      console.log({ currentTokenId }); // added for async debug
      console.log(file);
      cb(null, `${parseInt(currentTokenId, 10) + 1}.jpeg`);
    },
  }),
});
module.exports = { upload, nftUpload, s3 };
