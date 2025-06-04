const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Cebir', 'Geometri', 'Fonksiyonlar', 'Sayılar', 'Olasılık', 'Trigonometri', 'Analitik Geometri', 'Limit', 'Türev', 'İntegral']
  },
  topic: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Kolay', 'Orta', 'Zor']
  },
  grade: {
    type: String,
    required: true,
    enum: ['6. Sınıf', '7. Sınıf', '8. Sınıf', '9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf']
  },
  year: {
    type: String,
    default: new Date().getFullYear().toString()
  },
  source: {
    type: String,
    default: 'Genel'
  },
  questionType: {
    type: String,
    default: 'Múltipla Escolha',
    enum: ['Múltipla Escolha', 'Verdadeiro/Falso', 'Dissertativa', 'Cálculo']
  },
  hasImage: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: ''
  },
  solution: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  downloads: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);