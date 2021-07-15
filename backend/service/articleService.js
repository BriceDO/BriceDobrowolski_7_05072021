const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class ArticleService {

    static createArticle(article) {
        // Pour créer un article
        let query = "INSERT INTO jhkes (date_creation, article_contenu, article_image, id_utilisateur) VALUES ('"+article.date_creation+"', '"+article.article_contenu.replace("'","''")+"', '"+article.article_image+"', "+article.id_utilisateur+")";
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
        let query = "SELECT * FROM articles ORDER BY date_creation DESC";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (getUser)");
                    // Sinon si le tableau est vide (il n'a pas de longueur), on envoie null
                } else if (result.length == 0){
                    resolve(null); 
                } else {
                    // On récupère tous les articles et leurs infos
                    resolve({... result}); 
                }
            });
        });
    }

    static modifyArticle(id){
        // Pour modifier son propre article. Le contenu texte et l'image uniquement.
        let query = "UPDATE articles SET article_contenu = '"+article.article_contenu.replace("'","''")+"', article_image = '"+article.article_image+"' "; 

    }

    static deleteArticle(id){
        // Pour supprimer son propre article, avec les commentaires associés
        
    }

}