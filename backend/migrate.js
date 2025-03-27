const mongoose = require('mongoose');
const Motorcycle = require('./models/Motorcycle');

mongoose.connect('mongodb://localhost:27017/motorcycle', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Motorcycle.deleteMany({});
    const data = [
      { tenLoaiXe: 'Honda Blade số', giaTheoNgay: 100000, soLuong: 3 },
      { tenLoaiXe: 'Honda Wave số', giaTheoNgay: 110000, soLuong: 4 },
      { tenLoaiXe: 'Yamaha Exciter', giaTheoNgay: 120000, soLuong: 7 },
      { tenLoaiXe: 'Honda SH', giaTheoNgay: 105000, soLuong: 2 },
      { tenLoaiXe: 'Honda Future', giaTheoNgay: 200000, soLuong: 3 },
      { tenLoaiXe: 'Yamaha Sirius', giaTheoNgay: 150000, soLuong: 5 },
      { tenLoaiXe: 'Suzuki VIva', giaTheoNgay: 100000, soLuong: 11 },
      { tenLoaiXe: 'Piagio Liberty', giaTheoNgay: 110000, soLuong: 6 },
      { tenLoaiXe: 'Honda Click', giaTheoNgay: 120000, soLuong: 12 },
      { tenLoaiXe: 'Yamaha FZ', giaTheoNgay: 125000, soLuong: 8 }
    ];
    await Motorcycle.insertMany(data);
    process.exit();
  })
  .catch(err => {
    process.exit(1);
  });