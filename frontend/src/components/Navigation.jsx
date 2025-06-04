import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${isActive('/')
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Home className="h-5 w-5" />
            <span>Ana Sayfa</span>
          </Link>

          <Link
            to="/history"
            className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${isActive('/history')
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Clock className="h-5 w-5" />
            <span>Geçmiş</span>
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin/questions"
              className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${isActive('/admin/questions')
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <Shield className="h-5 w-5" />
              <span>Admin Panel</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;