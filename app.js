import express from 'express';
import path, { parse } from 'path';
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

// Middleware pour parser les données du corps des requêtes POST
app.use(express.urlencoded({ extended: true }));

let contacts = [...data]; // Initialiser les contacts avec les données mockées

// Route principale : affiche la page d'accueil
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contacts', (req, res) => {
  setTimeout(() => {
    res.render('list', { contacts });
  }, 1000);
});

app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  const id = Math.random().toString();

  contacts.push({ id, name, email, phone });

  res.redirect(`/contacts/${id}`);
});

app.get('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const contact = contacts.find(c => c.id === id);

  res.render('contact', { contact });
});

app.get('/contacts/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);

  res.render('edit-form', { contact });
});

app.put('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;
  const index = contacts.findIndex(c => c.id === id);

  contacts[index] = { id, name, email, phone };

  res.render('list', { contacts });
});

app.post('/search', (req, res) => {
  const term = req.body.term?.toLowerCase() || '';

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(term));

  setTimeout(() => {
    res.render('list', { contacts: filteredContacts });
  }, 1000);
});

app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);

  contacts = contacts.filter(contact => contact.id !== id);

  res.render('list', { contacts });
});

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
