const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class UserService {

    static isUserAlreadyExist(user) {
        // Créer la requete pour savoir si l'utilisateur existe
        let query = "SELECT * FROM utilisateurs where adresse_mail = '"+user.email+"'";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                // Si l'utilisateur n'existe pas, c'est bon on peut le créer
                if(result.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        });
    }

    static createUser(user) {
        // Création de l'utilisateur dans la BDD
        let query = "INSERT INTO utilisateurs (nom, prenom, adresse_mail, mot_de_passe) VALUES ('"+user.nom+"', '"+user.prenom+"', '"+user.email+"', '"+user.password+"')";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (createUser)"); 
                } else {
                    resolve(true);
                };
            });
        });
    }

    static getUser(email) {
        // Trouver l'utilisateur' en BDD avec son adresse mail
        let query = "SELECT * FROM utilisateurs WHERE adresse_mail= '"+email+"'";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (getUser)");
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
};