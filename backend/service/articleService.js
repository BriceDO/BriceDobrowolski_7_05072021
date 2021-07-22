const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class ArticleService {

    static createArticle(article) {
        // Pour créer un article
        let query = "INSERT INTO articles (date_creation, titre, article_contenu, article_image, id_utilisateur) VALUES (NOW(), '"+article.titre.replace("'","''")+"', '"+article.article_contenu.replace("'","''")+"',  '"+article.article_image+"', "+article.id_utilisateur+")";
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

    static getOneArticle(id){
        // Pour recevoir un seul article, celui sélectionné
        let query = "SELECT * FROM articles WHERE id = "+id+" ";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (getOneArticle)");
                    // Sinon si le tableau est vide (il n'a pas de longueur), on envoie null
                } else if (result.length == 0){
                    resolve(null);
                } else {
                    // On envoie la première ligne du tableau (il y en aura qu'une) et ses infos
                    resolve({... result[0]}); 
                }
            });
        });
    };

    static getAllArticles(){
        // Pour recevoir tous les articles de tout le monde par ordre chronologique (du plus récent au plus vieux)
        let query = "SELECT a.*, count(c.id) as nbCommentaire " ;
            query += "FROM articles as a LEFT JOIN commentaires as c on (a.id = c.id_article) " ;
            query +=  "GROUP BY a.id " ;
            query +=  "ORDER BY a.date_creation DESC;";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                    // Sinon si le tableau est vide (il n'a pas de longueur), on envoie null
                } else if (result.length == 0){
                    resolve(null); 
                } else {    
                    // On récupère tous les articles et leurs infos
                    resolve([...result]); 
                }
            });
        });
    }

    static modifyArticle(id, article){
        // Pour modifier un article
        // D'abord une nouvelle promesse
        return new Promise((resolve, reject) => {
            // On va rechercher l'article avec getOneArticle
            this.getOneArticle(id)
            .then(articleOriginal => {
                // Si l'article n'existe pas : erreur
                if (articleOriginal == null) {
                    reject("Article introuvable")
                } else {
                    // Si il existe, on lance la requête SQL de l'update
                    let query = "UPDATE articles SET article_contenu = '"+article.article_contenu.replace("'","''")+"', article_image = '"+article.article_image+"' WHERE id = "+id+" "; 
                    connection.query(query, (err, result) => {
                        if (err) {
                            reject("Probleme SQL (modifyArticle)");
                        } else {
                            resolve(true);
                        } 
                    });
                };
            });
        });
    };

    static deleteArticle(id){
        // Pour supprimer son propre article, avec les commentaires associés
        let query = "DELETE FROM articles WHERE id = "+id+" ";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (deleteArticle)");
                } else {
                    resolve("Article supprimé");
                }
            });
        });
    }; 
}; 