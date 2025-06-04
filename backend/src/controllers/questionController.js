const Question = require('../models/Question');
const User = require('../models/User');
const { generateQuestionsPDF } = require('../utils/pdfGenerator');

// Soruları listele (çözüm olmadan)
exports.getQuestions = async (req, res) => {
  try {
    const { subject, difficulty, grade, search, page = 1, limit = 12 } = req.query;

    // Filtre oluştur
    const filter = {};
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;
    if (grade) filter.grade = grade;
    if (search) {
      filter.$or = [
        { content: { $regex: search, $options: 'i' } },
        { topic: { $regex: search, $options: 'i' } }
      ];
    }

    // Sayfalama
    const skip = (page - 1) * limit;

    const questions = await Question.find(filter)
      .select('-solution') // Çözümü gizle
      .sort('-createdAt')
      .limit(limit * 1)
      .skip(skip);

    const total = await Question.countDocuments(filter);

    res.json({
      questions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Soru listeleme hatası:', error);
    res.status(500).json({ error: 'Sorular yüklenirken bir hata oluştu' });
  }
};

// Soruları indir
exports.downloadQuestions = async (req, res) => {
  try {
    const { questionIds } = req.body;
    const userId = req.userId;

    if (!questionIds || questionIds.length === 0) {
      return res.status(400).json({ error: 'Lütfen indirmek istediğiniz soruları seçin' });
    }

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Kredi kontrolü
    if (user.credits < questionIds.length) {
      return res.status(400).json({
        error: 'Yetersiz kredi',
        required: questionIds.length,
        available: user.credits
      });
    }

    // Soruları getir (çözümleriyle birlikte)
    const questions = await Question.find({
      _id: { $in: questionIds }
    });

    // İndirme sayısını artır
    await Question.updateMany(
      { _id: { $in: questionIds } },
      { $inc: { downloads: 1 } }
    );

    // Kullanıcının kredisini düş
    user.credits -= questionIds.length;
    user.downloadedQuestions.push(...questionIds);
    await user.save();

    // PDF oluştur
    const pdfBuffer = await generateQuestionsPDF(questions, user.name);

    // PDF'i gönder
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="matematik-sorulari-${Date.now()}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('İndirme hatası:', error);
    res.status(500).json({ error: 'İndirme sırasında bir hata oluştu' });
  }
};

// Tek soru detayı (sadece admin)
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Soru bulunamadı' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Soru yüklenirken bir hata oluştu' });
  }
};

// Yeni soru ekle (sadece admin)
exports.createQuestion = async (req, res) => {
  try {
    // Admin kontrolü
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const question = new Question(req.body);
    await question.save();

    res.status(201).json({
      message: 'Soru başarıyla eklendi',
      question
    });
  } catch (error) {
    console.error('Soru ekleme hatası:', error);
    res.status(500).json({ error: 'Soru eklenirken bir hata oluştu' });
  }
};