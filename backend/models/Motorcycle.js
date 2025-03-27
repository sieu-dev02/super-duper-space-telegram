const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotorcycleSchema = new Schema({
  tenLoaiXe: { type: String, required: true },
  giaTheoNgay: { type: Number, required: true },
  soLuong: { type: Number, required: true }
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);