import React from 'react';
import { Check, Lock, Star, Download, Image } from 'lucide-react';

const QuestionCard = ({ question, isSelected, onToggle }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Kolay':
        return 'bg-green-100 text-green-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Zor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl ${isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      <div className="p-6">
        {/* Üst Kısım */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-gray-500">{question.code}</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">
              {question.subject} - {question.topic}
            </h3>
          </div>
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg transition-all transform hover:scale-110 ${isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
          >
            {isSelected ? (
              <Check className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Etiketler */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            {question.grade}
          </span>
          {question.hasImage && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold flex items-center gap-1">
              <Image className="h-3 w-3" />
              Görsel
            </span>
          )}
        </div>

        {/* Soru İçeriği */}
        <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 pointer-events-none"></div>
          <p
            className="text-gray-700 line-clamp-3 select-none"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            {question.content}
          </p>
        </div>

        {/* Alt Kısım - İstatistikler */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{question.rating?.toFixed(1) || '0.0'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{question.downloads || 0}</span>
            </div>
          </div>

          {isSelected && (
            <span className="text-sm font-semibold text-blue-600">
              Seçildi ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;