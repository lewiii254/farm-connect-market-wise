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
  Home,
  GraduationCap,
  UserPlus,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const marketplaceItems = [
    { 
      path: '/markets', 
      label: 'Market Prices',
      icon: TrendingUp,
      description: 'Live crop prices'
    },
    { 
      path: '/buyers', 
      label: 'Marketplace',
      icon: Package,
      description: 'Buy & sell crops'
    }
  ];

  const servicesItems = [
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
      description: 'Loans & M-Pesa'
    }
  ];

  const youthItems = [
    { 
      path: '/youth-mentorship', 
      label: 'Mentorship',
      icon: UserPlus,
      description: 'Connect with mentors'
    },
    { 
      path: '/agri-education', 
      label: 'Education',
      icon: GraduationCap,
      description: 'Learn farming skills'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out Successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        title: "Sign Out Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const NavDropdown = ({ title, items, activeColor = "green" }) => {
    const isActive = items.some(item => location.pathname === item.path);
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`h-9 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive 
                ? `text-${activeColor}-700 bg-${activeColor}-50` 
                : `text-gray-600 hover:text-${activeColor}-600 hover:bg-${activeColor}-50`
            }`}
          >
            {title}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border shadow-lg">
          {items.map((item, index) => (
            <DropdownMenuItem key={item.path} asChild>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 text-sm cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-200 shadow-md">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  FarmConnect
                </span>
                <div className="text-xs text-green-600 font-medium">Kenya</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <NavDropdown title="Marketplace" items={marketplaceItems} activeColor="green" />
            <NavDropdown title="Services" items={servicesItems} activeColor="green" />
            <NavDropdown title="Youth" items={youthItems} activeColor="blue" />

            <Link
              to="/community"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/community'
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Community</span>
            </Link>
          </div>

          {/* User Profile / Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="hidden lg:flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="h-9">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user.user_metadata?.full_name || 'Farmer'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="h-9">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-9">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-2 max-h-96 overflow-y-auto">
              <Link
                to="/"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              {/* Marketplace Section */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                  Marketplace
                </div>
                {marketplaceItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
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
                ))}
              </div>

              {/* Services Section */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                  Services
                </div>
                {servicesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
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
                ))}
              </div>

              {/* Youth Section */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider px-3 py-2">
                  Youth Programs
                </div>
                {youthItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Community */}
              <Link
                to="/community"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === '/community'
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Community</span>
              </Link>

              {/* User Actions */}
              {user ? (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link to="/auth">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
