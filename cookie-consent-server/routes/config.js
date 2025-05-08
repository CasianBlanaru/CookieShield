import express from 'express';
import Config from '../models/Config.js';

const router = express.Router();

// GET /prod/config.json
router.get('/config.json', async (req, res) => {
  try {
    const { v, apiKey } = req.query;
    
    // Wenn kein API-Key angegeben ist, schicke eine Standardkonfiguration
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'API key is required' 
      });
    }
    
    // Finde die Konfiguration basierend auf dem API-Key
    let config = await Config.findOne({ apiKey });
    
    // Wenn keine Konfiguration gefunden wurde, erstelle eine neue
    if (!config) {
      config = new Config({ 
        apiKey,
        version: v || '1.0.0'
      });
      await config.save();
    }
    
    // Wenn eine Version angegeben ist, prüfe, ob die Konfiguration aktualisiert werden muss
    if (v && config.version !== v) {
      config.version = v;
      await config.save();
    }
    
    // Rückgabe der Konfiguration ohne interne Felder
    const { _id, __v, ...configResponse } = config.toObject();
    
    res.json(configResponse);
  } catch (error) {
    console.error('Fehler beim Abrufen der Konfiguration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /prod/config
router.post('/config', async (req, res) => {
  try {
    const { apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    
    // Finde die Konfiguration oder erstelle eine neue
    let config = await Config.findOne({ apiKey });
    
    if (config) {
      // Aktualisiere vorhandene Konfiguration
      Object.assign(config, req.body);
    } else {
      // Erstelle neue Konfiguration
      config = new Config(req.body);
    }
    
    await config.save();
    res.status(201).json({ message: 'Configuration saved successfully', apiKey });
  } catch (error) {
    console.error('Fehler beim Speichern der Konfiguration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 