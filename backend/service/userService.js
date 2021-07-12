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
        let query = "INSERT INTO utilisateurs (nom, prenom, adresse_mail, mot_de_passe) VALUES ('"+user.nom+"', '"+user.prenom+"', '"+user.email+"', '"+user.password+"')fgfg";
        console.log(query);
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                console.log(err);
                if (err) {
                    reject("Probleme sql"); 
                } else {
                    resolve(true);
                }
                
            })
        });
    }

    static deleteUser(user) {
    }

    static updateUser(user) {
    }

    static getUser(user) {

        //trouver le user en BDD avec son adresse mail ( récupérer toutes informations)
        
        //retourner toutes les informations
        return user;
    }

}