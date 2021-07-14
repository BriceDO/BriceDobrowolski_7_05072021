const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/articles');
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, articleCtrl.createArticle);

module.exports = router;