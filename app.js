import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import data from './data/data.js'; // Données mockées (liste de contacts)

// Importation des modules fileURLToPath et path pour gérer les chemins de fichiers
// Cela est nécessaire pour obtenir la variable __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Définir le dossier "views" comme dossier de templates, et EJS comme moteur de rendu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rendre accessible le dossier "public" pour les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static('public'));

// Route principale : affiche la page d'accueil
app.get('/', (req, res) => {
  res.render('index');
});

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
