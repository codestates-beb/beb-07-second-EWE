// AWS, multer-S3 테스트를 위한 임시 파일입니다!
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.listen(8080, () => console.log('listening on port 8080'));
