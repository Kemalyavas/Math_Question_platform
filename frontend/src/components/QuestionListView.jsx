import React from 'react';
import { Eye, Download, Image as ImageIcon, FileText } from 'lucide-react';

const QuestionListView = ({ questions, selectedQuestions, onToggle, onPreview }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Kolay': return 'text-green-600 bg-green-50';
      case 'Orta': return 'text-yellow-600 bg-yellow-50';
      case 'Zor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Tablo Başlığı */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            {questions.length} soru listelendi
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Seçili: {selectedQuestions.length}</span>
          </div>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      questions.forEach(q => {
                        if (!selectedQuestions.includes(q._id)) {
                          onToggle(q._id);
                        }
                      });
                    } else {
                      selectedQuestions.forEach(id => onToggle(id));
                    }
                  }}
                  checked={questions.length > 0 && questions.every(q => selectedQuestions.includes(q._id))}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kod
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Konu / Alt Konu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Soru İçeriği
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zorluk
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sınıf
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kaynak
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                İndirme
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((question) => (
              <tr
                key={question._id}
                className={`hover:bg-gray-50 ${selectedQuestions.includes(question._id) ? 'bg-blue-50' : ''}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => onToggle(question._id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {question.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{question.subject}</div>
                    <div className="text-sm text-gray-500">{question.topic}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 line-clamp-2">{question.content}</p>
                    {question.hasImage && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs text-purple-600">
                        <ImageIcon className="h-3 w-3" />
                        Görsel içerir
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {question.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {question.source || 'Genel'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Download className="h-4 w-4" />
                    {question.downloads || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onPreview(question)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Önizle"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-400 cursor-not-allowed"
                      title="Çözümü görmek için soruyu indirin"
                    >
                      <FileText className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionListView;