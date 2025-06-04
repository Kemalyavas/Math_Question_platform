# Math Question Platform

Matematik sorularını yönetmek, indirmek ve paylaşmak için geliştirilmiş modern bir web platformu.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**
  - Kayıt ve giriş sistemi
  - JWT tabanlı güvenli kimlik doğrulama
  - Admin ve normal kullanıcı rolleri

- **Soru Bankası**
  - Matematik sorularını görüntüleme
  - Kategorilere göre filtreleme
  - Zorluk seviyelerine göre sıralama
  - Soru indirme özelliği (kredi sistemi ile)

- **Kredi Sistemi**
  - Kullanıcılar kredi satın alabilir
  - Her soru indirme işlemi kredi harcar
  - Kredi geçmişi takibi

- **Admin Paneli**
  - Soru ekleme/düzenleme/silme
  - Kullanıcı yönetimi
  - Sistem istatistikleri

## 🛠️ Teknolojiler

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt (şifre güvenliği)
- CORS

### Frontend
- React.js
- React Router
- Axios
- Context API (state yönetimi)
- Tailwind CSS

## 📋 Gereksinimler

- Node.js (v14 veya üstü)
- MongoDB (v4 veya üstü)
- npm veya yarn

## 🔧 Kurulum

### 1. Projeyi klonlayın
```bash
git clone https://github.com/yourusername/math-question-platform.git
cd math-question-platform
```

### 2. Backend Kurulumu

```bash
# Backend klasörüne gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin ve kendi değerlerinizi girin
# Özellikle JWT_SECRET'ı değiştirin!

# Admin kullanıcısını oluşturun
npm run create-admin

# Sunucuyu başlatın
npm start
```

### 3. Frontend Kurulumu

```bash
# Yeni terminal açın ve frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun
cp .env.example .env

# Uygulamayı başlatın
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🔐 Güvenlik Notları

1. **Environment Değişkenleri**: `.env` dosyalarını asla Git'e yüklemeyin!
2. **JWT Secret**: Production'da güçlü, rastgele bir secret kullanın
3. **MongoDB**: Production'da authentication ve SSL kullanın
4. **Admin Şifresi**: İlk kurulumdan sonra admin şifresini değiştirin
5. **CORS**: Production'da sadece kendi domain'inize izin verin

## 📁 Proje Yapısı

```
math-question-platform/
├── backend/
│   ├── src/
│   │   ├── models/        # Veritabanı modelleri
│   │   ├── routes/        # API rotaları
│   │   ├── middleware/    # Auth middleware
│   │   ├── app.js        # Express app
│   │   └── createAdmin.js # Admin oluşturma scripti
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # React bileşenleri
│   │   ├── pages/        # Sayfa bileşenleri
│   │   ├── contexts/     # Context providers
│   │   ├── services/     # API servisleri
│   │   └── App.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🚀 Production'a Deployment

### Backend
1. MongoDB Atlas veya başka bir cloud MongoDB servisi kullanın
2. Environment değişkenlerini production değerleriyle güncelleyin
3. PM2 veya benzeri bir process manager kullanın
4. HTTPS kullanın

### Frontend
1. Build oluşturun: `npm run build`
2. Netlify, Vercel veya benzeri bir servise deploy edin
3. Environment değişkenlerini ayarlayın

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri

### Questions
- `GET /api/questions` - Tüm soruları listele
- `GET /api/questions/:id` - Belirli bir soruyu getir
- `POST /api/questions/download` - Soruları indir (kredi gerektirir)

### Credits
- `POST /api/credits/purchase` - Kredi satın al
- `GET /api/credits/history` - Kredi geçmişi

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 İletişim

Proje Sahibi - [@yourusername](https://github.com/yourusername)

Proje Linki: [https://github.com/yourusername/math-question-platform](https://github.com/yourusername/math-question-platform)