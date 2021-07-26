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
            // Prendre le mot de passe crypté et créer un nouvel utilisateur avec email et mot de passe
            const user = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hash,
                photo: req.body.photo
            };
            
            // Vérifier si l'utilisateur existe déjà
            UserService.isUserAlreadyExist(user).then((isExist) => {
            // Le then ici renvoie à la promesse de la classe UserService.isUserAlreadyExist et le isExist fait référence à result

                if (!isExist && req.body.email != undefined) {
                    // Enregistrer l'utilisateur dans la base de donnée
                    UserService.createUser(user)
                    .then(res.status(201).json({ message: 'Utilisateur créé !' }))
                } else {
                    res.status(400).json({ "message erreur" : "L'email a déjà été utilisé ou sa validation n'a pas été autorisée. Création du compte impossible." })
                }
            });

        })
        .catch(error => res.status(500).json({ "message erreur" : error.message }));
    } 
};

exports.login = (req, res, next) => {
    // Trouver l'utilisateur dans la base de donnée grâce à l'email
    UserService.getUser(req.body.email).then(user => { 
    // Le then ici renvoie à la promesse de la classe UserService.getUser et le user fait référence à result
            // Si l'utilisateur n'est pas trouvé alors erreur
            if(user == null) {
                return res.status(401).json({ error: 'Compte utilisateur non trouvé !' });
            }
            // Si il est trouvé on passe à la suite du code...

            // ...bcrypt va comparer le mot de passe avec le hash de la base de donnée
            bcrypt.compare(req.body.password, user.mot_de_passe).then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                /* Si on a bien trouvé le mot de passe, on renvoie un status 200 et un objet json
                qui contient un userID et un Token d'authentification grâce à jsonwebtoken */
                res.status(200).json({
                    ... user,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN,
                        { expiresIn : '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ errMessage }));
        })
        // Uniquement si il y a un problème de connexion / base de donnée
        .catch(error => res.status(500).json({ "message" : "Problème de connexion" }));
};

exports.info = (req, res, next) => {
    UserService.getUserInfo(req.body.userId)
    .then(user => {
        res.status(201).json({ user })
    })
    .catch(err => {
        res.status(500).json({ err })
    })
};