const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mathbank.com';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('HATA: ADMIN_PASSWORD environment değişkeni tanımlanmamış!');
      console.error('.env dosyanızda ADMIN_PASSWORD tanımlayın.');
      process.exit(1);
    }

    // Admin var mı kontrol et
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin zaten mevcut!');
      process.exit(0);
    }

    // Admin oluştur
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      credits: 1000
    });

    await admin.save();
    console.log('Admin başarıyla oluşturuldu!');
    console.log('Email:', adminEmail);
    console.log('Şifre: .env dosyasında tanımlı');

    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

createAdmin();