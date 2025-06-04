import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

const FilterBar = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  // Genişletilmiş filtre seçenekleri
  const filterOptions = {
    subjects: ['Cebir', 'Geometri', 'Fonksiyonlar', 'Sayılar', 'Olasılık', 'Trigonometri', 'Analitik Geometri', 'Limit', 'Türev', 'İntegral'],
    difficulties: ['Kolay', 'Orta', 'Zor'],
    grades: ['6. Sınıf', '7. Sınıf', '8. Sınıf', '9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf'],
    years: ['2025', '2024', '2023', '2022', '2021', '2020'],
    sources: ['Epcar (Afa)', 'Espcex (Aman)', 'Unesp', 'Fuvest', 'Unicamp', 'ENEM', 'ITA', 'IME'],
    questionTypes: ['Múltipla Escolha', 'Verdadeiro/Falso', 'Dissertativa', 'Cálculo']
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      difficulty: '',
      grade: '',
      search: '',
      year: '',
      source: '',
      questionType: ''
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Arama ve Ana Filtreler */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Arama */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Soru içeriğinde ara..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Hızlı Filtreler */}
        <div className="flex gap-2">
          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
          >
            <option value="">Tüm Konular</option>
            {filterOptions.subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">Zorluk</option>
            {filterOptions.difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* Filtre Butonu */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors relative"
        >
          <Filter className="h-5 w-5" />
          <span>Gelişmiş Filtreler</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Gelişmiş Filtre Alanları */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Sınıf */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sınıf Seviyesi
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.grade}
                onChange={(e) => handleFilterChange('grade', e.target.value)}
              >
                <option value="">Tüm Sınıflar</option>
                {filterOptions.grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Yıl */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sınav Yılı
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">Tüm Yıllar</option>
                {filterOptions.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Kaynak */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sınav/Kaynak
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
              >
                <option value="">Tüm Kaynaklar</option>
                {filterOptions.sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Soru Tipi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soru Tipi
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filters.questionType}
                onChange={(e) => handleFilterChange('questionType', e.target.value)}
              >
                <option value="">Tüm Tipler</option>
                {filterOptions.questionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtre Özeti ve Temizleme */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value && key !== 'search') {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Tüm Filtreleri Temizle
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;