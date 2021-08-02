const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class CommentService {

    static createComment(commentaire) {
        // Pour créer un commentaire
        let query = "INSERT INTO commentaires (date_creation, commentaire_contenu, commentaire_image, id_article, id_utilisateur) VALUES (now(), '"+commentaire.commentaire_contenu.replace("'","''")+"', '"+commentaire.commentaire_image+"', "+commentaire.id_article+", "+commentaire.id_utilisateur+")";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(true);
                };
            });
        });
    };

    static getAllComments(id_article) {
        // Pour recevoir tous les commentaires d'un article par ordre chronologique (du plus récent au plus vieux)

        let query = "SELECT c.*, u.prenom, nom, photo " ;
            query += "FROM commentaires as c LEFT JOIN utilisateurs as u ON u.id = c.id_utilisateur " ;
            query += "WHERE id_article = "+id_article+" " ;
            query += "ORDER BY c.date_creation DESC;";
    
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject(console.log(err.sql));
                    // Sinon si le tableau est vide (il n'a pas de longueur), on envoie null
                } else if (result.length == 0){
                    resolve(null); 
                } else {
                    // On récupère tous les commentaires
                    resolve([... result]); 
                }
            });
        });
    };

    static modifyComment(id, commentaire){
        return new Promise((resolve, reject) => {
            let query = "UPDATE commentaires SET commentaire_contenu = '"+commentaire.commentaire_contenu.replace("'","''")+"', commentaire_image = '"+commentaire.commentaire_image+"' WHERE id = "+id+" ";
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (modifyComment)");
                } else {
                    resolve(true);
                }
            });
        });
    };

    static deleteComment(id) {
        // Pour supprimer son propre commentaire
        let query = "DELETE FROM commentaires WHERE id = "+id+" ";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (deleteComment)");
                } else {
                    resolve("Commentaire supprimé");
                }
            });
        });
    };
};