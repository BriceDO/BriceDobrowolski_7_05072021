const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class CommentService {

    static createComment(commentaire) {
        // Pour créer un commentaire
        let query = "INSERT INTO commentaires (date_creation, commentaire_contenu, commentaire_image, id_article, id_utilisateur) VALUES ('"+comment.date_creation+"', '"+comment.commentaire_contenu.replace("'","''")+"', '"+comment.commentaire_image+"', "+comment.id_article+", "+comment.id_utilisateur+")";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (createComment)"); 
                } else {
                    resolve(true);
                };
            });
        });
    }

    static getAllComments() {
        // Pour recevoir tous les commentaires d'un article par ordre chronologique (du plus récent au plus vieux)
        let query = "SELECT * FROM commentaires WHERE id_article = "+id_article+" ORDER BY date_creation DESC";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (getAllArticles)");
                    // Sinon si le tableau est vide (il n'a pas de longueur), on envoie null
                } else if (result.length == 0){
                    resolve(null); 
                } else {
                    // On récupère tous les commentaires
                    resolve({... result}); 
                }
            });
        });
    }

    static modifyComment(id){

        
    }

    static deleteComment(id) {
        // Pour supprimer son propre commentaire
        let query = "DELETE FROM commentaires WHERE id_utilisateur = "+id.id_utilisateur+" AND id_article = "+id.id_article+" ";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (deleteComment)");
                } else {
                    resolve("Commentaire supprimé");
                }
            });
        });
    }
}