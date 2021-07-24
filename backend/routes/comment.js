const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Modifier un commentaire
router.put('/:id', auth, multer, commentCtrl.modifyComment);

 // Supprimer un commentaire
router.delete('/:id', auth, multer, commentCtrl.deleteComment)

module.exports = router;