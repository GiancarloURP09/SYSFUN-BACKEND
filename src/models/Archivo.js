const mongoose = require('mongoose');

const archivoSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  md5: String,
  data: Buffer,
});

module.exports = mongoose.model('Archivo', archivoSchema);