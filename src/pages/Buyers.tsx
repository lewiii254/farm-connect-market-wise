
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CropListings from '@/components/marketplace/CropListings';
import BuyerProfile from '@/components/marketplace/BuyerProfile';
import CropListingForm from '@/components/marketplace/CropListingForm';
import { SeedCropsButton } from '@/components/marketplace/SeedCropsButton';
import { Package, Plus, User, ShoppingCart, TrendingUp, Users, Leaf } from 'lucide-react';

const Buyers = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSeedSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const stats = [
    { label: 'Active Listings', value: '1,247', icon: Package, color: 'text-blue-600 bg-blue-100' },
    { label: 'Daily Transactions', value: '89', icon: ShoppingCart, color: 'text-green-600 bg-green-100' },
    { label: 'Price Increase', value: '+12%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Active Users', value: '3,456', icon: Users, color: 'text-purple-600 bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold mb-2">Agricultural Marketplace</h1>
                <p className="text-green-100 text-lg max-w-2xl">
                  Connect with farmers and buyers across Kenya. Buy fresh produce directly from farms or sell your crops to verified buyers with secure M-Pesa payments.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-green-100">Today's Featured</div>
                  <div className="text-xl font-bold">Fresh Maize</div>
                  <div className="text-sm text-green-200">KSh 45/kg • Nakuru</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-green-100">Quick Demo</div>
                  <SeedCropsButton onSuccess={handleSeedSuccess} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Marketplace Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure M-Pesa STK Push payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Direct farmer-to-buyer connections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Real-time crop availability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Quality assured organic options</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Delivery coordination support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Fair pricing for all parties</span>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm border border-gray-200 rounded-xl p-1">
            <TabsTrigger 
              value="listings" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Browse Crops</span>
              <span className="sm:hidden">Browse</span>
            </TabsTrigger>
            <TabsTrigger 
              value="create"
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">List Crops</span>
              <span className="sm:hidden">List</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">My Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <CropListings key={refreshKey} />
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">List Your Crops</h2>
                <p className="text-gray-600">Create a listing to sell your crops to buyers across Kenya</p>
              </div>
              <CropListingForm onSuccess={handleListingSuccess} />
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyer Profile</h2>
                <p className="text-gray-600">Manage your profile and view your buying history</p>
              </div>
              <BuyerProfile />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Buyers;
