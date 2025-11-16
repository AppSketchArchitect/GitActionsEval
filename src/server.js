const express = require('express');
const { connectDB } = require('./config/database');
const requestTypesRouter = require('./routes/requestTypes');

const app = express();

app.use(express.json());

// Route permettant de savoir si le serveur est allumé et accessible
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
});

app.use('/api/request-types', requestTypesRouter);

const SERVER_PORT = process.env.SERVER_PORT;

// On se connecte à la base de données
connectDB()
  .then(() => {
    // Si la connexion réussi alors on démarre le serveur
    console.log('MongoDB connected');
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    // Sinon on quitte le lancement
    console.error('MongoDB connection failed', err);
    process.exit(1);
  });

module.exports = app;