import React from 'react';
import { X, ShoppingCart, Download, AlertCircle } from 'lucide-react';

const Cart = ({ selectedQuestions, questions, onClose, onDownload, credits, onRemove }) => {
  const selectedQuestionDetails = questions.filter(q => selectedQuestions.includes(q._id));
  const totalCreditsNeeded = selectedQuestions.length;
  const hasEnoughCredits = credits >= totalCreditsNeeded;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Seçili Sorular</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Henüz soru seçmediniz</p>
              <p className="text-sm mt-2">Soruları seçmek için üzerlerindeki kilit ikonuna tıklayın</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedQuestionDetails.map((question) => (
                <div key={question._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold">{question.subject} - {question.topic}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">{question.code}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{question.grade}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className={`text-sm font-medium ${question.difficulty === 'Kolay' ? 'text-green-600' :
                          question.difficulty === 'Orta' ? 'text-yellow-600' :
                            'text-red-600'
                        }`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(question._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedQuestions.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Toplam Soru</p>
                <p className="text-2xl font-bold">{selectedQuestions.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Gerekli Kredi</p>
                <p className="text-2xl font-bold">{totalCreditsNeeded}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Mevcut Kredi</p>
                <p className={`text-2xl font-bold ${hasEnoughCredits ? 'text-green-600' : 'text-red-600'}`}>
                  {credits}
                </p>
              </div>
            </div>

            {!hasEnoughCredits && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Yetersiz kredi! {totalCreditsNeeded - credits} kredi daha gerekli.
                </p>
              </div>
            )}

            <button
              onClick={onDownload}
              disabled={!hasEnoughCredits}
              className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${hasEnoughCredits
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <Download className="h-5 w-5" />
              <span>Soruları İndir</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;