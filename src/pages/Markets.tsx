
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import PriceAlerts from '@/components/PriceAlerts';
import MarketComparison from '@/components/MarketComparison';
import PriceCharts from '@/components/PriceCharts';
import CropSeasonality from '@/components/CropSeasonality';
import DistanceCalculator from '@/components/DistanceCalculator';

const Markets = () => {
  const marketData = [
    {
      crop: 'Maize',
      currentPrice: 'KSh 45/kg',
      change: '+5.2%',
      trend: 'up',
      market: 'Wakulima Market',
      location: 'Nairobi',
    },
    {
      crop: 'Beans',
      currentPrice: 'KSh 120/kg',
      change: '-2.1%',
      trend: 'down',
      market: 'Kongowea Market',
      location: 'Mombasa',
    },
    {
      crop: 'Potatoes',
      currentPrice: 'KSh 38/kg',
      change: '0.0%',
      trend: 'stable',
      market: 'Nakuru Wholesale',
      location: 'Nakuru',
    },
    {
      crop: 'Tomatoes',
      currentPrice: 'KSh 85/kg',
      change: '+8.5%',
      trend: 'up',
      market: 'Karatina Market',
      location: 'Nyeri',
    },
    {
      crop: 'Kales (Sukuma Wiki)',
      currentPrice: 'KSh 25/bunch',
      change: '+12.3%',
      trend: 'up',
      market: 'Eldoret Market',
      location: 'Eldoret',
    },
    {
      crop: 'Avocados',
      currentPrice: 'KSh 35/piece',
      change: '-4.7%',
      trend: 'down',
      market: 'Kisumu Fresh Produce',
      location: 'Kisumu',
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
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="mt-2 text-lg text-gray-600">
            Comprehensive market data, price trends, and farming insights for Kenyan farmers
          </p>
        </div>

        {/* Current Market Prices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Market Prices</h2>
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
        </div>

        {/* New Enhanced Features */}
        <div className="space-y-12">
          {/* Price Alerts and Market Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PriceAlerts />
            <DistanceCalculator />
          </div>

          {/* Market Comparison */}
          <MarketComparison />

          {/* Price Charts */}
          <PriceCharts />

          {/* Crop Seasonality */}
          <CropSeasonality />
        </div>
      </div>
    </div>
  );
};

export default Markets;
