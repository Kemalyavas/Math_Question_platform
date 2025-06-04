const User = require('../models/User');

// Kredi satın al
exports.purchaseCredits = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.userId;

    // Geçerli kredi paketleri
    const validPackages = [10, 25, 50, 100];
    if (!validPackages.includes(amount)) {
      return res.status(400).json({ error: 'Geçersiz kredi paketi' });
    }

    // Fiyatlandırma
    const prices = {
      10: 29,
      25: 59,
      50: 99,
      100: 179
    };

    const price = prices[amount];

    // Burada normalde ödeme işlemi yapılır (Stripe, Iyzico vb.)
    // Şimdilik direkt kredi ekleyelim

    const user = await User.findById(userId);
    user.credits += amount;
    await user.save();

    res.json({
      message: 'Kredi satın alma başarılı',
      addedCredits: amount,
      totalCredits: user.credits,
      price
    });
  } catch (error) {
    console.error('Kredi satın alma hatası:', error);
    res.status(500).json({ error: 'Kredi satın alınırken bir hata oluştu' });
  }
};

// Kredi geçmişi
exports.getCreditHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('credits downloadedQuestions')
      .populate('downloadedQuestions', 'code subject topic');

    res.json({
      currentCredits: user.credits,
      totalDownloads: user.downloadedQuestions.length,
      downloadHistory: user.downloadedQuestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Kredi geçmişi alınırken bir hata oluştu' });
  }
};