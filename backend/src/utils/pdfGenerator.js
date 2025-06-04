const PDFDocument = require('pdfkit');

function generateQuestionsPDF(questions, userName) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Başlık sayfası
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .text('Matematik Soru Bankası', { align: 'center' });

      doc.moveDown();

      doc.fontSize(14)
        .font('Helvetica')
        .text(`Hazırlayan: ${userName}`, { align: 'center' });

      doc.fontSize(12)
        .text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, { align: 'center' });

      doc.moveDown(2);

      doc.fontSize(10)
        .fillColor('gray')
        .text(`Toplam ${questions.length} soru`, { align: 'center' });

      // Her sayfa için watermark fonksiyonu
      const addWatermark = () => {
        doc.save();
        doc.fontSize(40)
          .fillColor('#cccccc')
          .opacity(0.3)
          .text(userName, 100, 300, {
            rotate: -45,
            align: 'center',
            width: 400
          });
        doc.restore();
      };

      // Sorular
      questions.forEach((question, index) => {
        if (index > 0) {
          doc.addPage();
        } else {
          doc.addPage();
        }

        // Watermark ekle
        addWatermark();

        // Soru başlığı
        doc.fontSize(14)
          .fillColor('black')
          .font('Helvetica-Bold')
          .text(`Soru ${index + 1}`, 50, 50);

        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('gray')
          .text(`Kod: ${question.code} | ${question.subject} - ${question.topic}`, 50, 70);

        doc.text(`Sınıf: ${question.grade} | Zorluk: ${question.difficulty}`, 50, 85);

        doc.moveDown();

        // Soru içeriği
        doc.fontSize(12)
          .fillColor('black')
          .font('Helvetica')
          .text(question.content, {
            align: 'justify',
            lineGap: 5
          });

        // Çözüm bölümü
        doc.moveDown(3);
        doc.fontSize(12)
          .font('Helvetica-Bold')
          .text('ÇÖZÜM:');

        doc.moveDown();
        doc.fontSize(11)
          .font('Helvetica')
          .text(question.solution, {
            align: 'justify',
            lineGap: 5
          });

        // Sayfa numarası
        doc.fontSize(9)
          .fillColor('gray')
          .text(
            `Sayfa ${index + 2}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
      });

      // PDF'i bitir
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { generateQuestionsPDF };