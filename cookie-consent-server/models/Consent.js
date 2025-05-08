import mongoose from 'mongoose';

const ConsentSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
    index: true
  },
  visitor_id: {
    type: String,
    required: true,
    index: true
  },
  preferences: {
    type: Map,
    of: Boolean,
    default: {}
  },
  action: {
    type: String,
    enum: ['accept_all', 'deny', 'update', 'withdraw'],
    required: true
  },
  config_version: {
    type: String,
    required: true
  },
  visitor_country: String,
  visitor_region: String,
  consent_policy: String,
  url: String,
  granular_metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Consent', ConsentSchema); 