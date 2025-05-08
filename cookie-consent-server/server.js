import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Lade Umgebungsvariablen
dotenv.config();

// Initialisiere Express-App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Einfacher Statusendpunkt
app.get('/', (req, res) => {
  res.json({ message: 'Cookie Consent API Server is running' });
});

// Routen
import configRoutes from './routes/config.js';
import consentRoutes from './routes/consent.js';

app.use('/prod', configRoutes);
app.use('/prod/consent', consentRoutes);

// Datenbank-Verbindung
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
}); 