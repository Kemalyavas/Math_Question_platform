import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { questionAPI, creditAPI } from '../services/api';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import QuestionListView from '../components/QuestionListView';
import FilterBar from '../components/FilterBar';
import Cart from '../components/Cart';
import CreditModal from '../components/CreditModal';
import { BookOpen, Brain, Download, Star, Grid, List } from 'lucide-react';

const Dashboard = () => {
  const { user, updateCredits } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    difficulty: '',
    grade: '',
    search: '',
    year: '',
    source: '',
    questionType: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const [showCart, setShowCart] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'grid' veya 'list'
  const [previewQuestion, setPreviewQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [filters, pagination.page]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await questionAPI.getQuestions({
        ...filters,
        page: pagination.page,
        limit: 12
      });
      setQuestions(response.data.questions);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Sorular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (questionId) => {
    setSelectedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const downloadQuestions = async () => {
    if (selectedQuestions.length > user.credits) {
      alert('Yeterli krediniz yok!');
      return;
    }

    try {
      // PDF olarak indir
      const response = await fetch('http://localhost:5000/api/questions/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ questionIds: selectedQuestions })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'İndirme başarısız');
      }

      // PDF'i indir
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `matematik-sorulari-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Kredileri güncelle (manuel olarak)
      const newCredits = user.credits - selectedQuestions.length;
      updateCredits(newCredits);

      // Başarı mesajı
      alert(`${selectedQuestions.length} soru başarıyla indirildi!`);

      // Seçimleri temizle
      setSelectedQuestions([]);
      setShowCart(false);

      // Soruları yenile (indirme sayısı güncellensin)
      fetchQuestions();
    } catch (error) {
      alert(error.message || 'İndirme sırasında bir hata oluştu');
    }
  };

  const handleCreditPurchase = async (amount) => {
    try {
      const response = await creditAPI.purchaseCredits(amount);
      updateCredits(response.data.totalCredits);
      alert(`${amount} kredi başarıyla eklendi!`);
      setShowCreditModal(false);
    } catch (error) {
      alert('Kredi satın alınırken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        credits={user?.credits || 0}
        onCartClick={() => setShowCart(true)}
        cartCount={selectedQuestions.length}
        onCreditClick={() => setShowCreditModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filtreler */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Görünüm Seçici ve İstatistikler */}
        <div className="flex justify-between items-center mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Toplam Soru</p>
                <p className="text-xl font-bold">{pagination.total}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Konu Sayısı</p>
                <p className="text-xl font-bold">10</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">İndirdiğiniz</p>
                <p className="text-xl font-bold">0</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ortalama Puan</p>
                <p className="text-xl font-bold">4.4</p>
              </div>
            </div>
          </div>

          {/* Görünüm Butonları */}
          <div className="ml-4 flex items-center bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <List className="h-5 w-5" />
              <span className="hidden sm:inline">Liste</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <Grid className="h-5 w-5" />
              <span className="hidden sm:inline">Kart</span>
            </button>
          </div>
        </div>

        {/* Sorular */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {questions.map((question) => (
              <QuestionCard
                key={question._id}
                question={question}
                isSelected={selectedQuestions.includes(question._id)}
                onToggle={() => toggleQuestion(question._id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <QuestionListView
              questions={questions}
              selectedQuestions={selectedQuestions}
              onToggle={toggleQuestion}
              onPreview={(question) => setPreviewQuestion(question)}
            />
          </div>
        )}

        {/* Sayfalama */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-50"
            >
              Önceki
            </button>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>

      {/* Sepet Modal */}
      {showCart && (
        <Cart
          selectedQuestions={selectedQuestions}
          questions={questions}
          onClose={() => setShowCart(false)}
          onDownload={downloadQuestions}
          credits={user?.credits || 0}
          onRemove={toggleQuestion}
        />
      )}

      {/* Kredi Satın Alma Modal */}
      {showCreditModal && (
        <CreditModal
          onClose={() => setShowCreditModal(false)}
          onPurchase={handleCreditPurchase}
        />
      )}
    </div>
  );
};

export default Dashboard;