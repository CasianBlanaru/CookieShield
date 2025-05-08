import express from 'express';
import Consent from '../models/Consent.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /prod/consent (Speichern der Zustimmung)
router.post('/', async (req, res) => {
  try {
    const {
      preferences,
      apiKey,
      action,
      visitor_id,
      config_version,
      visitor_country,
      visitor_region,
      consent_policy,
      granular_metadata,
      url
    } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ error: 'Valid preferences object is required' });
    }

    if (!action || !['accept_all', 'deny', 'update', 'withdraw'].includes(action)) {
      return res.status(400).json({ error: 'Valid action is required' });
    }

    // Generiere eine neue Visitor-ID, wenn keine mitgegeben wurde
    const visitorId = visitor_id || `v-${uuidv4()}`;

    // Erstelle einen neuen Consent-Eintrag
    const consent = new Consent({
      apiKey,
      visitor_id: visitorId,
      preferences,
      action,
      config_version: config_version || '1.0.0',
      visitor_country,
      visitor_region,
      consent_policy,
      granular_metadata,
      url,
      timestamp: new Date()
    });

    await consent.save();

    res.status(201).json({
      message: 'Consent saved successfully',
      visitor_id: visitorId
    });
  } catch (error) {
    console.error('Fehler beim Speichern der Zustimmung:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /prod/consent/:visitorId (Abrufen der Zustimmung für einen Besucher)
router.get('/:visitorId', async (req, res) => {
  try {
    const { visitorId } = req.params;
    const { apiKey } = req.query;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    // Finde den neuesten Consent-Eintrag für den Besucher
    const consent = await Consent.findOne(
      { apiKey, visitor_id: visitorId },
      {},
      { sort: { timestamp: -1 } }
    );

    if (!consent) {
      return res.status(404).json({ error: 'No consent found for this visitor' });
    }

    const { _id, __v, ...consentData } = consent.toObject();

    res.json(consentData);
  } catch (error) {
    console.error('Fehler beim Abrufen der Zustimmung:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 