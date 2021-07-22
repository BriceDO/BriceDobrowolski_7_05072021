const fs = require('fs');
const { exception } = require('console');
const ArticleService = require ('../service/articleService')
const CommentService = require ('../service/commentService')

// ARTICLES

exports.createArticle = (req, res, next) => {

    const article = {
        date_creation : req.body.date_creation,
        titre : req.body.titre,
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

exports.getAllArticles = (req, res, next) => {

    ArticleService.getAllArticles().then(allArticles =>{
        if (allArticles == null) {
            return res.status(404).json({ "message": "Articles introuvables" })
        }
        return res.status(201).json({ allArticles })
    })
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
}

exports.modifyArticle = (req, res, next) => {

    ArticleService.modifyArticle(req.params.id, req.body)
    .then(() => {
        return res.status(201).json({ "message" : "article modifié !" })
    }) 
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
};

exports.deleteArticle = (req, res, next) => {

    ArticleService.deleteArticle(req.params.id)
    .then(() => {
        return res.status(201).json({ "message": 'Article supprimé !' });
   })
   .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
};

// COMMENTAIRES

exports.createComment = (req, res, next) => {

    const commentaire = {
        commentaire_contenu : req.body.commentaire_contenu,
        commentaire_image : req.body.commentaire_image,
        id_article : req.params.id,
        id_utilisateur : req.body.id_utilisateur
    }

    CommentService.createComment(commentaire)
    .then(() => {
        return res.status(201).json({ "message": 'Commentaire créé !' });
    })
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
    });
}

exports.getAllComments = (req, res, next) => {

    CommentService.getAllComments(req.params.id)
    .then(commentaires =>{
        if (commentaires == null) {
            return res.status(404).json({ "message": "Commentaires introuvables" })
        }
        return res.status(201).json({ commentaires })
    })
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
}

exports.modifyComment = (req, res, next) => {
    CommentService.modifyComment(req.params.id, req.body)
    .then(() => {
        return res.status(201).json({ "message" : "Commentaire modifié !" })
    }) 
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
   });
}

exports.deleteComment = (req, res, next) => {
    CommentService.deleteComment(req.params.id)
    .then(() => {
        return res.status(201).json({ "message": 'Commentaire supprimé !' });
    })
    .catch((errMessage) => {
        return res.status(400).json({ "message": errMessage });
    });
}