const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../service/userService');

exports.signup = (req, res, next) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(req.body.password)) {
        res.status(400).json("Le mot de passe doit comporter au moins 6 caractères dont au moins un chiffre")
    } else {
        // Hasher le mot de passe
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Prend le mot de passe crypté et créé un nouvel utilisateur avec email et mot de passe
            const user = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hash
            };
            console.log("Voici le user à créer");
            console.log(user);
            // Enregistre l'utilisateur dans la base de donnée
            //Faut vérifier si il existe avant
            UserService.isUserAlreadyExist(user)
            .then((isExist) => {
                if (!isExist) {
                    UserService.createUser(user)
                    .then(res.status(201).json({ message: 'Utilisateur créé !' }))
                } else {
                    res.status(400).json({ "message erreur" : "Il existe déjà en BDD" })
                }
            });

        })
        .catch(error => res.status(500).json({ "message erreur" : error.message }));
    } 
};

exports.login = (req, res, next) => {

}