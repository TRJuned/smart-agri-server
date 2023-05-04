const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  soilMoisture: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('readingData', PostSchema);
