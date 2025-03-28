const mongoose = require('mongoose');

const MotorcycleSchema = new mongoose.Schema({
  tenLoaiXe: { type: String, required: true },
  giaTheoNgay: { type: Number, required: true },
  soLuong: { type: Number, required: true },
  hinhAnh: { type: String, required: true } 
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);
