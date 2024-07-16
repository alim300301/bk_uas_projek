const express = require('express');
const router = express.Router();
const Barang = require('../models/barang'); // Pastikan Anda sudah membuat model Barang

// Mendapatkan semua barang
router.get('/', async (req, res) => {
  try {
    const barang = await Barang.find();
    res.json(barang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mendapatkan barang berdasarkan Nama
router.get('/:nama', async (req, res) => {
  try {
    const barang = await Barang.findOne({ nama: req.params.nama });
    if (!barang) return res.status(404).json({ message: 'Barang not found' });
    res.json(barang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menambah barang baru
router.post('/', async (req, res) => {
  const barang = new Barang({
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    harga: req.body.harga
  });

  try {
    const newBarang = await barang.save();
    res.status(201).json(newBarang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update barang berdasarkan nama
router.put('/:nama', async (req, res) => {
  try {
    const updatedBarang = await Barang.findOneAndUpdate(
      { nama: req.params.nama },
      {
        $set: {
          nama: req.body.nama,
          deskripsi: req.body.deskripsi,
          harga: req.body.harga
        }
      },
      { new: true }
    );

    if (!updatedBarang) {
      return res.status(404).json({ message: 'Barang not found' });
    }

    res.json(updatedBarang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Hapus barang berdasarkan nama
router.delete('/:nama', async (req, res) => {
  try {
    const deletedBarang = await Barang.findOneAndDelete({ nama: req.params.nama });

    if (!deletedBarang) {
      return res.status(404).json({ message: 'Barang not found' });
    }

    res.json({ message: 'Barang deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
