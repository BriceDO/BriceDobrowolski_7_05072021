const fs = require('fs');
const { exception } = require('console');
const ArticleService = require ('../service/articleService')

exports.createArticle = (req, res, next) => {

    const article = {
        date_creation : req.body.date_creation,
        article_contenu : req.body.article_contenu,
        article_image : req.body.article_image,
        id_utilisateur : req.body.id_utilisateur
    };

    ArticleService.createArticle(article)
    .then(() => {
         return res.status(201).json({ "message": 'Article créé !' });
    })
    .catch((errMessage) => {
         return res.status(400).json({ "message": errMessage });
    });
};

exports.getOneArticle = (req, res, next) => {
    
    ArticleService.getOneArticle(req.params.id).then(article => {
        if (article == null) {
        return res.status(404).json({ "message": "Article introuvable" })
        }
        return res.status(201).json({ article })
    })
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
};