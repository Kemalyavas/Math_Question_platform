import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calculator, CreditCard, ShoppingCart, LogOut, User } from 'lucide-react';
import Navigation from './Navigation';

const Header = ({ credits, onCartClick, cartCount, onCreditClick }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MathBank Pro
              </h1>
            </div>

            {/* Sağ taraf */}
            <div className="flex items-center space-x-4">
              {/* Kullanıcı bilgisi */}
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">{user?.name}</span>
              </div>

              {/* Kredi */}
              <button
                onClick={onCreditClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                <CreditCard className="h-4 w-4" />
                <span className="font-semibold">{credits} Kredi</span>
              </button>

              {/* Sepet */}
              <button
                onClick={onCartClick}
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Çıkış */}
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
};

export default Header;