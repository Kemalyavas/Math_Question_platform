import React from 'react';
import { X, CreditCard, TrendingUp } from 'lucide-react';

const CreditModal = ({ onClose, onPurchase }) => {
  const creditPackages = [
    {
      amount: 10,
      price: 29,
      popular: false,
      perCredit: 2.9
    },
    {
      amount: 25,
      price: 59,
      popular: true,
      perCredit: 2.36,
      discount: '20%'
    },
    {
      amount: 50,
      price: 99,
      popular: false,
      perCredit: 1.98,
      discount: '30%'
    },
    {
      amount: 100,
      price: 179,
      popular: false,
      perCredit: 1.79,
      discount: '40%'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Kredi Satın Al</h2>
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
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Daha fazla soru indirmek için kredi satın alın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPackages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg ${pkg.popular
                    ? 'border-blue-500 shadow-lg bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      EN POPÜLER
                    </span>
                  </div>
                )}

                {pkg.discount && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{pkg.discount}
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">{pkg.amount}</p>
                  <p className="text-gray-600 mb-4">Kredi</p>

                  <div className="mb-4">
                    <p className="text-3xl font-bold">₺{pkg.price}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ₺{pkg.perCredit.toFixed(2)} / kredi
                    </p>
                  </div>

                  <button
                    onClick={() => onPurchase(pkg.amount)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${pkg.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                  >
                    Satın Al
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-600" />
              Ödeme Bilgisi
            </h3>
            <p className="text-sm text-gray-600">
              Güvenli ödeme altyapımız ile kredi kartı veya banka kartı ile ödeme yapabilirsiniz.
              Tüm ödemeleriniz 256-bit SSL sertifikası ile korunmaktadır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditModal;