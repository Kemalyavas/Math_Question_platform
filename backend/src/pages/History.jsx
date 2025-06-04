import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { creditAPI } from '../services/api';
import Header from '../components/Header';
import { Download, Calendar, FileText, CreditCard } from 'lucide-react';

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await creditAPI.getCreditHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Geçmiş yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        credits={user?.credits || 0}
        onCartClick={() => { }}
        cartCount={0}
        onCreditClick={() => { }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">İndirme Geçmişi</h1>

        {/* Özet Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mevcut Kredi</p>
                <p className="text-3xl font-bold text-green-600">{history?.currentCredits || 0}</p>
              </div>
              <CreditCard className="h-12 w-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam İndirme</p>
                <p className="text-3xl font-bold text-blue-600">{history?.totalDownloads || 0}</p>
              </div>
              <Download className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kullanılan Kredi</p>
                <p className="text-3xl font-bold text-purple-600">{history?.totalDownloads || 0}</p>
              </div>
              <FileText className="h-12 w-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* İndirme Listesi */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">İndirilen Sorular</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : history?.downloadHistory?.length > 0 ? (
            <div className="divide-y">
              {history.downloadHistory.map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.subject} - {item.topic}</p>
                      <p className="text-sm text-gray-600">
                        Kod: {item.code} • {item.grade}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        {new Date(item.downloadedAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Download className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Henüz soru indirmemişsiniz</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;