const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/comments');
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Créer un commentaire
// router.post('/', multer, commentCtrl.createComment);

// Récupèrer tous les commentaires
// router.get('/', multer, commentCtrl.getAllComments);

// Modifier un commentaire
// router.put('/:id', multer, commentCtrl.modifyComment);

// Supprimer un commentaire
// router.delete('/:id', multer, commentCtrl.deleteComment)

module.exports = router;