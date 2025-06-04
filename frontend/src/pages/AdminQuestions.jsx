import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { questionAPI } from '../services/api';
import Header from '../components/Header';
import { Plus, Save, X } from 'lucide-react';

const AdminQuestions = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    content: '',
    difficulty: '',
    grade: '',
    solution: '',
    hasImage: false
  });

  const subjects = ['Cebir', 'Geometri', 'Fonksiyonlar', 'Sayılar', 'Olasılık', 'Trigonometri', 'Analitik Geometri'];
  const difficulties = ['Kolay', 'Orta', 'Zor'];
  const grades = ['6. Sınıf', '7. Sınıf', '8. Sınıf', '9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Soru kodunu otomatik oluştur
      const code = `MAT${new Date().getFullYear()}${Date.now().toString().slice(-3)}`;

      const response = await fetch('http://localhost:5000/api/questions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...formData, code })
      });

      if (!response.ok) {
        throw new Error('Soru eklenirken hata oluştu');
      }

      alert('Soru başarıyla eklendi!');
      setShowForm(false);
      setFormData({
        subject: '',
        topic: '',
        content: '',
        difficulty: '',
        grade: '',
        solution: '',
        hasImage: false
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // Admin değilse erişimi engelle
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Yetkisiz Erişim</h1>
          <p className="mt-2 text-gray-600">Bu sayfaya sadece adminler erişebilir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        credits={user?.credits || 0}
        onCartClick={() => { }}
        cartCount={0}
        onCreditClick={() => { }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Soru Yönetimi</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            <span>{showForm ? 'İptal' : 'Yeni Soru Ekle'}</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Yeni Soru Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konu
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Konu
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: Denklemler"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zorluk
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sınıf
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soru Metni
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Soruyu yazınız..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çözüm
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Çözümü yazınız..."
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasImage"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.hasImage}
                  onChange={(e) => setFormData({ ...formData, hasImage: e.target.checked })}
                />
                <label htmlFor="hasImage" className="ml-2 text-sm text-gray-700">
                  Soru görsel içeriyor
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                <Save className="h-5 w-5" />
                <span>Soruyu Kaydet</span>
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Soru listesi ve düzenleme özellikleri yakında eklenecek...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestions;