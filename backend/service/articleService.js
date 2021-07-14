const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class ArticleService {

    static createArticle(article) {
        // Pour créer un article
        let query = "INSERT INTO articles (date_creation, article_contenu, article_image, id_utilisateur) VALUES ('"+article.date_creation+"', '"+article.article_contenu+"', '"+article.article_image+"', '"+article.id_utilisateur+"')";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (createArticle)"); 
                } else {
                    resolve(true);
                };
            });
        });
    }

    static getArticle(article) {
        // Pour avoir un article
        let query = "SELECT * FROM articles WHERE id = '"+article.id+"' ";

    }

    static getAllArticles(article){
        // Pour avoir tous les articles de tout le monde par ordre chronologique (du plus récent au plus vieux)
        let query = "SELECT * FROM articles ORDER BY date_creation DESC";

    }

    static deleteArticle(article) {
        // Pour supprimer son propre article
        let query = "DELETE FROM articles WHERE ...";

    }

    static modifyArticle(article){
        // Pour modifier son propre article. Le contenu texte et l'image uniquement.
        let query = "UPDATE articles SET article_contenu = '"+article.article_contenu+"', article_image = '"+article.article_image+"' "; 
    }

}