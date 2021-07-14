const fs = require('fs');
const { exception } = require('console');
const ArticleService = require ('../service/articleService')

exports.createArticle = (req, res, next) => {

    const article = {
        date_creation = req.body.date_creation,
        article_contenu = req.body.article_contenu,
        article_image = req.body.article_image,
        id_utilisateur = req.body.id_utilisateur
    };

    ArticleService.createArticle(article)
    .then(res.status(201).json ({ message: 'Article créé !' }) )
    .catch(res.status(400).json({ message: 'Problème pour créer un article'}))
};