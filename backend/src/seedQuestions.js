const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const sampleQuestions = [
  {
    code: "MAT2025001",
    subject: "Cebir",
    topic: "Denklemler",
    content: "2x² + 5x - 3 = 0 denkleminin köklerini bulunuz.",
    difficulty: "Orta",
    grade: "9. Sınıf",
    year: "2025",
    source: "Epcar (Afa)",
    questionType: "Múltipla Escolha",
    solution: "Δ = b² - 4ac = 25 + 24 = 49\nx₁ = (-5 + 7) / 4 = 1/2\nx₂ = (-5 - 7) / 4 = -3",
    rating: 4.5,
    downloads: 234
  },
  {
    code: "MAT2024002",
    subject: "Geometri",
    topic: "Üçgenler",
    content: "ABC üçgeninde |AB| = 8 cm, |AC| = 6 cm ve m(BAC) = 60° olduğuna göre, |BC| kaç cm'dir?",
    difficulty: "Zor",
    grade: "10. Sınıf",
    year: "2024",
    source: "Espcex (Aman)",
    questionType: "Cálculo",
    hasImage: true,
    solution: "Kosinüs teoremi: BC² = AB² + AC² - 2·AB·AC·cos(60°)\nBC² = 64 + 36 - 2·8·6·(1/2) = 100 - 48 = 52\nBC = √52 = 2√13 cm",
    rating: 4.8,
    downloads: 567
  },
  {
    code: "MAT2025003",
    subject: "Fonksiyonlar",
    topic: "Türev",
    content: "f(x) = x³ - 3x² + 2x fonksiyonunun yerel ekstremum noktalarını bulunuz.",
    difficulty: "Zor",
    grade: "12. Sınıf",
    year: "2025",
    source: "ITA",
    questionType: "Dissertativa",
    solution: "f'(x) = 3x² - 6x + 2\nf'(x) = 0 için: 3x² - 6x + 2 = 0\nx = (6 ± √12) / 6\nx₁ = (3 - √3) / 3, x₂ = (3 + √3) / 3",
    rating: 4.2,
    downloads: 189
  },
  {
    code: "MAT2023004",
    subject: "Sayılar",
    topic: "Asal Sayılar",
    content: "100'den küçük en büyük asal sayı kaçtır?",
    difficulty: "Kolay",
    grade: "6. Sınıf",
    year: "2023",
    source: "ENEM",
    questionType: "Múltipla Escolha",
    solution: "100'den küçük asal sayıları kontrol ettiğimizde: 97 en büyük asal sayıdır.",
    rating: 4.0,
    downloads: 892
  },
  {
    code: "MAT2024005",
    subject: "Olasılık",
    topic: "Permütasyon",
    content: "5 kişi bir sıraya kaç farklı şekilde oturabilir?",
    difficulty: "Orta",
    grade: "11. Sınıf",
    year: "2024",
    source: "Fuvest",
    questionType: "Múltipla Escolha",
    solution: "5! = 5 × 4 × 3 × 2 × 1 = 120 farklı şekilde oturabilirler.",
    rating: 4.6,
    downloads: 445
  },
  {
    code: "MAT2025006",
    subject: "Cebir",
    topic: "Polinomlar",
    content: "P(x) = x³ - 6x² + 11x - 6 polinomunun çarpanlarını bulunuz.",
    difficulty: "Orta",
    grade: "10. Sınıf",
    year: "2025",
    source: "Unicamp",
    questionType: "Cálculo",
    solution: "P(1) = 0, P(2) = 0, P(3) = 0\nP(x) = (x-1)(x-2)(x-3)",
    rating: 4.3,
    downloads: 234
  },
  {
    code: "MAT2022007",
    subject: "Geometri",
    topic: "Daire",
    content: "Yarıçapı 5 cm olan bir dairenin alanı kaç cm²'dir?",
    difficulty: "Kolay",
    grade: "7. Sınıf",
    year: "2022",
    source: "Genel",
    questionType: "Múltipla Escolha",
    solution: "Alan = πr² = π × 5² = 25π cm²",
    rating: 4.1,
    downloads: 678
  },
  {
    code: "MAT2025008",
    subject: "Trigonometri",
    topic: "Trigonometrik Denklemler",
    content: "sin(2x) = 1/2 denklemini [0, 2π] aralığında çözünüz.",
    difficulty: "Zor",
    grade: "11. Sınıf",
    year: "2025",
    source: "IME",
    questionType: "Dissertativa",
    hasImage: true,
    solution: "2x = π/6 + 2πk veya 2x = 5π/6 + 2πk\nx = π/12, 5π/12, 13π/12, 17π/12",
    rating: 4.7,
    downloads: 156
  },
  {
    code: "MAT2024009",
    subject: "Limit",
    topic: "Limit Hesaplama",
    content: "lim(x→2) (x² - 4)/(x - 2) limitini hesaplayınız.",
    difficulty: "Orta",
    grade: "12. Sınıf",
    year: "2024",
    source: "Unesp",
    questionType: "Cálculo",
    solution: "lim(x→2) (x² - 4)/(x - 2) = lim(x→2) (x+2)(x-2)/(x-2) = lim(x→2) (x+2) = 4",
    rating: 4.4,
    downloads: 389
  },
  {
    code: "MAT2025010",
    subject: "İntegral",
    topic: "Belirli İntegral",
    content: "∫₀² x² dx integralini hesaplayınız.",
    difficulty: "Orta",
    grade: "12. Sınıf",
    year: "2025",
    source: "ITA",
    questionType: "Cálculo",
    solution: "∫x² dx = x³/3 + C\n[x³/3]₀² = 8/3 - 0 = 8/3",
    rating: 4.5,
    downloads: 267
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Mevcut soruları temizle
    await Question.deleteMany({});
    console.log('Mevcut sorular temizlendi');

    // Yeni soruları ekle
    const questions = await Question.insertMany(sampleQuestions);
    console.log(`${questions.length} soru başarıyla eklendi`);

    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedDatabase();