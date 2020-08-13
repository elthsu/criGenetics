const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = Schema({
  url: {
    type: String
  },
  redirect1:{
    type: String
  },
  redirect2:{
    type: String
  },
  trackerOn: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now  
  },
  clicks: { type: Array, ref: 'Click' },
  conversions: { type: Array, ref: "Conversion"}
});

const clickSchema = Schema({
  sessionId:{
    type: String
  },
  userId: {
    type: String
  },
  url: {
    type: String
  },
  redirect:{
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now  
  }
});

const conversionSchema = Schema({
  sessionId:{
    type: String
  },
  userId: {
    type: String
  },
  campaign: {
    type: String
  },
  landing: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now  
  }
});

const Click = mongoose.model('Click', clickSchema);
const Tracker = mongoose.model('Tracker', trackSchema);
const Conversion = mongoose.model('Conversion', conversionSchema);
