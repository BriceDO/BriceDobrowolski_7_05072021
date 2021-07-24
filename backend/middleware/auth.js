const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupérer le token dans l'authentification
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // Récuperer le user ID
        const userId = decodedToken.userId;
        // Vérifier que le userId correspond bien à celui du token
       if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
    }   else {
        next();
    }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentiifée !' });
    }
};