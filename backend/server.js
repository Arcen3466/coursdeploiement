// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import du middleware CORS
const db = require('./database');
const app = express();

//utiliser CORS pour autoriser les requêtes de toutes les origines
app.use(cors());

app.use(bodyParser.json());

// Endpoint pour gérer l'inscription
app.post('/register', (req, res) => {
    const { name, firstname, email, birthday, city, postalCode } = req.body;

    const stmt = db.prepare(`INSERT INTO users (name, firstname, email, birthday, city, postalCode)
                            VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run([name, firstname, email, birthday, city, postalCode], function(err) {
    if (err) {
        return res.status(400).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
    }
    res.status(200).json({ message: 'Inscription réussie!', userId: this.lastID });
    });
    stmt.finalize();
});

//endpoint pour lister les utilisateurs (optionnel)
app.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
        return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
    res.status(200).json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
