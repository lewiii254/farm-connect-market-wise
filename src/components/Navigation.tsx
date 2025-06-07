
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  Menu, 
  X, 
  TrendingUp, 
  Users, 
  Package, 
  MessageCircle, 
  Truck, 
  CreditCard,
  BarChart3,
  Home
} from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const mainNavItems = [
    { 
      path: '/', 
      label: 'Home',
      icon: Home,
      description: 'Platform overview'
    },
    { 
      path: '/markets', 
      label: 'Markets',
      icon: TrendingUp,
      description: 'Live crop prices'
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
      description: 'Farmer network'
    }
  ];

  const secondaryNavItems = [
    { 
      path: '/supply-chain', 
      label: 'Logistics',
      icon: Truck,
      description: 'Track shipments'
    },
    { 
      path: '/financial-services', 
      label: 'Finance',
      icon: CreditCard,
      description: 'Loans & payments'
    },
    { 
      path: '/dashboard', 
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Your analytics'
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      toast({
        title: "Welcome back!",
        description: "Redirecting to your dashboard...",
      });
    } else {
      toast({
        title: "Welcome to FarmConnect!",
        description: "Join Kenya's leading agricultural marketplace and boost your farming profits.",
      });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-200 shadow-md">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  FarmConnect
                </span>
                <div className="text-xs text-green-600 font-medium">Kenya</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation */}
            <div className="flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-green-700 bg-green-50 shadow-sm border border-green-100'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {/* Enhanced Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200"></div>

            {/* Secondary Navigation */}
            <div className="flex items-center space-x-1">
              {secondaryNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium" 
                onClick={handleGetStarted}
              >
                <Users className="h-4 w-4 mr-2" />
                {user ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {/* Main Items */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Main Menu
                </div>
                {mainNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'text-green-700 bg-green-50 border border-green-100'
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
              </div>

              {/* Secondary Items */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Tools & Services
                </div>
                {secondaryNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
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
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-100">
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl py-3" 
                    onClick={() => {
                      handleGetStarted();
                      setIsMenuOpen(false);
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {user ? "Go to Dashboard" : "Join FarmConnect Today"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
