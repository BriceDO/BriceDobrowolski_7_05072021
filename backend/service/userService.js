const config = require('../conf/config');
const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = class UserService {

    static isUserAlreadyExist(user) {
        //créer la requete pour savoir si user existe
        let query = "select * from utilisateurs where adresse_mail = '"+user.email+"'";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
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
        console.log(query);
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

    static deleteUser(user) {
        let query = "DELETE * FROM utilisateurs WHERE adresse_mail= '"+user.email+"'";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (deleteUser)"); 
                } else {
                    resolve(true);
                };
            });
        }); 
    };

    static getUser(email) {
        // Trouver le user en BDD avec son adresse mail (récupérer toutes informations)
        let query = "SELECT * FROM utilisateurs WHERE adresse_mail= '"+email+"'" ;
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) {
                    reject("Probleme SQL (getUser)");
                } else if (result.length == 0){
                    resolve(null); 
                } else {
                    resolve({... result[0]}); 
                }
            });
        });
    };
};