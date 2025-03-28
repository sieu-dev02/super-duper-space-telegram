require('dotenv').config();
const mongoose = require('mongoose');
const Motorcycle = require('./models/Motorcycle');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/motorcycle';

const sampleMotorcycles = [
  {
    tenLoaiXe: "Honda Blade số",
    giaTheoNgay: 100000,
    soLuong: 3,
    hinhAnh: "https://google.com/honda-blade.jpg"
  },
  {
    tenLoaiXe: "Honda Wave số",
    giaTheoNgay: 110000,
    soLuong: 4,
    hinhAnh: "https://google.com/honda-wave.jpg"
  },
  {
    tenLoaiXe: "Yamaha Exciter",
    giaTheoNgay: 120000,
    soLuong: 7,
    hinhAnh: "https://google.com/yamaha-exciter.jpg"
  },
  {
    tenLoaiXe: "Honda SH",
    giaTheoNgay: 105000,
    soLuong: 2,
    hinhAnh: "https://google.com/honda-sh.jpg"
  },
  {
    tenLoaiXe: "Honda Future",
    giaTheoNgay: 200000,
    soLuong: 3,
    hinhAnh: "https://google.com/honda-future.jpg"
  },
  {
    tenLoaiXe: "Yamaha Sirius",
    giaTheoNgay: 150000,
    soLuong: 5,
    hinhAnh: "https://google.com/yamaha-sirius.jpg"
  },
  {
    tenLoaiXe: "Suzuki Viva",
    giaTheoNgay: 100000,
    soLuong: 11,
    hinhAnh: "https://google.com/suzuki-viva.jpg"
  },
  {
    tenLoaiXe: "Piaggio Liberty",
    giaTheoNgay: 110000,
    soLuong: 6,
    hinhAnh: "https://google.com/piaggio-liberty.jpg"
  },
  {
    tenLoaiXe: "Honda Click",
    giaTheoNgay: 120000,
    soLuong: 12,
    hinhAnh: "https://google.com/honda-click.jpg"
  },
  {
    tenLoaiXe: "Yamaha FZ",
    giaTheoNgay: 125000,
    soLuong: 8,
    hinhAnh: "https://google.com/yamaha-fz.jpg"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Motorcycle.deleteMany({});
    console.log('Old data cleared');

    await Motorcycle.insertMany(sampleMotorcycles);
    console.log('Sample data inserted');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
