
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import PriceAlerts from '@/components/PriceAlerts';
import MarketComparison from '@/components/MarketComparison';
import PriceCharts from '@/components/PriceCharts';
import CropSeasonality from '@/components/CropSeasonality';
import DistanceCalculator from '@/components/DistanceCalculator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MarketPrice {
  id: string;
  crop_name: string;
  market_name: string;
  location: string;
  price_per_kg: number;
  date: string;
  created_at: string;
}

const Markets = () => {
  const [marketData, setMarketData] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMarketData(data || []);
    } catch (error: any) {
      console.error('Error fetching market data:', error);
      toast({
        title: "Error",
        description: "Failed to load market prices",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  // Simulate price changes for demonstration
  const getRandomTrend = () => {
    const trends = ['up', 'down', 'stable'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const getRandomChange = () => {
    const changeNum = Math.random() * 20 - 10;
    const change = changeNum.toFixed(1);
    return `${changeNum >= 0 ? '+' : ''}${change}%`;
  };

  // Group latest prices by crop
  const latestPrices = marketData.reduce((acc, price) => {
    if (!acc[price.crop_name] || new Date(price.date) > new Date(acc[price.crop_name].date)) {
      acc[price.crop_name] = price;
    }
    return acc;
  }, {} as Record<string, MarketPrice>);

  const displayData = Object.values(latestPrices).map(price => ({
    ...price,
    trend: getRandomTrend(),
    change: getRandomChange(),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

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
            {displayData.map((item, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.crop_name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(item.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                  <CardDescription>{item.market_name} • {item.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    KSh {item.price_per_kg}/kg
                  </div>
                  <p className="text-sm text-gray-500">
                    Updated {new Date(item.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {displayData.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No market price data available</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* New Enhanced Features */}
        <div className="space-y-12">
          {/* Price Alerts and Distance Calculator */}
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
