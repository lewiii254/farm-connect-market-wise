
import React from 'react';
import Navigation from '@/components/Navigation';
import CropListings from '@/components/marketplace/CropListings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, TrendingUp, Users, Leaf } from 'lucide-react';

const Marketplace = () => {
  const stats = [
    {
      title: "Active Listings",
      value: "250+",
      description: "Fresh crops available",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Average Savings",
      value: "28%",
      description: "Compared to traditional markets",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Verified Farmers",
      value: "1,200+",
      description: "Quality assured produce",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Organic Options",
      value: "40%",
      description: "Certified organic crops",
      icon: Leaf,
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FarmConnect Marketplace</h1>
          <p className="text-lg text-gray-600">
            Buy fresh crops directly from verified farmers with secure M-Pesa payments
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Marketplace Benefits */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-green-800">Why Choose FarmConnect Marketplace?</CardTitle>
            <CardDescription className="text-green-700">
              Direct connections between farmers and consumers for better prices and fresher produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800">Direct Purchase</h3>
                <p className="text-sm text-green-700">Buy directly from farmers, no middlemen</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800">Better Prices</h3>
                <p className="text-sm text-blue-700">Fair prices for farmers, savings for buyers</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800">Fresh Quality</h3>
                <p className="text-sm text-purple-700">Farm-fresh produce with quality guarantee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Listings */}
        <CropListings key={Date.now()} />
      </div>
    </div>
  );
};

export default Marketplace;
