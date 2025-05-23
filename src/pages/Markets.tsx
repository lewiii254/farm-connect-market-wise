
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Markets = () => {
  const marketData = [
    {
      crop: 'Tomatoes',
      currentPrice: '$2.50/kg',
      change: '+5.2%',
      trend: 'up',
      market: 'Central Market',
      location: 'Downtown',
    },
    {
      crop: 'Potatoes',
      currentPrice: '$1.80/kg',
      change: '-2.1%',
      trend: 'down',
      market: 'Farmers Market',
      location: 'North District',
    },
    {
      crop: 'Onions',
      currentPrice: '$1.20/kg',
      change: '0.0%',
      trend: 'stable',
      market: 'Wholesale Market',
      location: 'Industrial Zone',
    },
    {
      crop: 'Carrots',
      currentPrice: '$2.00/kg',
      change: '+8.5%',
      trend: 'up',
      market: 'Organic Market',
      location: 'Green Valley',
    },
    {
      crop: 'Lettuce',
      currentPrice: '$3.20/kg',
      change: '+12.3%',
      trend: 'up',
      market: 'Fresh Produce Hub',
      location: 'City Center',
    },
    {
      crop: 'Corn',
      currentPrice: '$0.85/kg',
      change: '-4.7%',
      trend: 'down',
      market: 'Agricultural Exchange',
      location: 'Farm District',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Market Prices</h1>
          <p className="mt-2 text-lg text-gray-600">
            Real-time pricing information from markets in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{item.crop}</CardTitle>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <CardDescription>{item.market} • {item.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {item.currentPrice}
                </div>
                <p className="text-sm text-gray-500">
                  Updated 5 minutes ago
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Price Trends</h2>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">Interactive price charts coming soon!</p>
            <p className="text-sm text-gray-500 mt-2">
              Track historical pricing data and market trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
