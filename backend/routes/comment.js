const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/articles');
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Modifier un commentaire
router.put('/:id', multer, commentCtrl.modifyComment);

 // Supprimer un commentaire
router.delete('/:id', multer, commentCtrl.deleteComment)

module.exports = router;