
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout, Menu, X, TrendingUp, Users, Package, DollarSign, MessageCircle, Truck, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      path: '/', 
      label: 'Home',
      icon: Sprout,
      description: 'Main dashboard'
    },
    { 
      path: '/markets', 
      label: 'Market Prices',
      icon: TrendingUp,
      description: 'Real-time crop prices'
    },
    { 
      path: '/buyers', 
      label: 'Marketplace',
      icon: Package,
      description: 'Buy & sell crops'
    },
    { 
      path: '/community', 
      label: 'Community',
      icon: MessageCircle,
      description: 'Connect with farmers'
    },
    { 
      path: '/supply-chain', 
      label: 'Supply Chain',
      icon: Truck,
      description: 'Track your produce'
    },
    { 
      path: '/financial-services', 
      label: 'Financial',
      icon: CreditCard,
      description: 'Financial services'
    },
    { 
      path: '/dashboard', 
      label: 'Dashboard',
      icon: Users,
      description: 'Your profile'
    }
  ];

  const handleSignUp = () => {
    toast({
      title: "Welcome to FarmConnect!",
      description: "Sign up to unlock all features and connect with the farming community.",
    });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">FarmConnect</span>
                <div className="text-xs text-green-600 font-medium">Kenya</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-green-700 bg-green-50 shadow-sm'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.description}
                    </div>
                  </Link>
                );
              })}
              <div className="ml-4 pl-4 border-l border-gray-200">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200" 
                  onClick={handleSignUp}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Now
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white" 
                  onClick={handleSignUp}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join FarmConnect
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
