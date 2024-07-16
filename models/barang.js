const mongoose = require('mongoose');

// Definisi skema untuk barang
const barangSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  }
}, { collection: 'tokobangunan' }); // Menggunakan koleksi 'tokobangunan'

// Membuat dan mengekspor model Barang
module.exports = mongoose.model('Barang', barangSchema);
