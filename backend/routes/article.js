const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Créer un article
router.post('/', auth, multer, articleCtrl.createArticle);

// Récupérer un article
router.get('/:id', auth, multer, articleCtrl.getOneArticle);

// Récupèrer tous les articles
router.get('/', auth, multer, articleCtrl.getAllArticles);

// Modifier un article
router.put('/:id', auth, multer, articleCtrl.modifyArticle);

// Supprimer un article
router.delete('/:id', auth, multer, articleCtrl.deleteArticle)

// ROUTES COMMENTAIRES

//créer un commentaire pour l'article :id
router.post('/:id/comments', auth, multer, articleCtrl.createComment);

// Récupèrer tous les commentaires
router.get('/:id/comments', auth, multer, articleCtrl.getAllComments);

module.exports = router;