const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/articles');
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Créer un article
router.post('/', multer, articleCtrl.createArticle);

// Récupérer un article
router.get('/:id', multer, articleCtrl.getOneArticle);

// Récupèrer tous les articles
router.get('/', multer, articleCtrl.getAllArticles);

// Modifier un article
router.put('/:id', multer, articleCtrl.modifyArticle);

// Supprimer un article
router.delete('/:id', multer, articleCtrl.deleteArticle)

module.exports = router;