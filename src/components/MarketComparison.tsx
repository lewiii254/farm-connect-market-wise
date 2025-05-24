
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const MarketComparison = () => {
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  
  const crops = ['Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)', 'Avocados'];
  
  const marketData = {
    'Maize': [
      { market: 'Wakulima', price: 45, location: 'Nairobi' },
      { market: 'Kongowea', price: 42, location: 'Mombasa' },
      { market: 'Nakuru', price: 47, location: 'Nakuru' },
      { market: 'Karatina', price: 44, location: 'Nyeri' },
      { market: 'Eldoret', price: 46, location: 'Eldoret' },
    ],
    'Beans': [
      { market: 'Wakulima', price: 120, location: 'Nairobi' },
      { market: 'Kongowea', price: 115, location: 'Mombasa' },
      { market: 'Nakuru', price: 125, location: 'Nakuru' },
      { market: 'Karatina', price: 118, location: 'Nyeri' },
      { market: 'Eldoret', price: 122, location: 'Eldoret' },
    ],
    'Potatoes': [
      { market: 'Wakulima', price: 38, location: 'Nairobi' },
      { market: 'Kongowea', price: 35, location: 'Mombasa' },
      { market: 'Nakuru', price: 40, location: 'Nakuru' },
      { market: 'Karatina', price: 36, location: 'Nyeri' },
      { market: 'Eldoret', price: 39, location: 'Eldoret' },
    ],
    'Tomatoes': [
      { market: 'Wakulima', price: 85, location: 'Nairobi' },
      { market: 'Kongowea', price: 80, location: 'Mombasa' },
      { market: 'Nakuru', price: 88, location: 'Nakuru' },
      { market: 'Karatina', price: 82, location: 'Nyeri' },
      { market: 'Eldoret', price: 87, location: 'Eldoret' },
    ],
    'Kales (Sukuma Wiki)': [
      { market: 'Wakulima', price: 25, location: 'Nairobi' },
      { market: 'Kongowea', price: 22, location: 'Mombasa' },
      { market: 'Nakuru', price: 27, location: 'Nakuru' },
      { market: 'Karatina', price: 24, location: 'Nyeri' },
      { market: 'Eldoret', price: 26, location: 'Eldoret' },
    ],
    'Avocados': [
      { market: 'Wakulima', price: 35, location: 'Nairobi' },
      { market: 'Kongowea', price: 32, location: 'Mombasa' },
      { market: 'Nakuru', price: 37, location: 'Nakuru' },
      { market: 'Karatina', price: 33, location: 'Nyeri' },
      { market: 'Eldoret', price: 36, location: 'Eldoret' },
    ],
  };

  const chartConfig = {
    price: {
      label: "Price (KSh)",
      color: "#22c55e"
    }
  };

  const currentData = marketData[selectedCrop as keyof typeof marketData] || [];
  const bestPrice = Math.max(...currentData.map(d => d.price));
  const worstPrice = Math.min(...currentData.map(d => d.price));
  const bestMarket = currentData.find(d => d.price === bestPrice);
  const worstMarket = currentData.find(d => d.price === worstPrice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Price Comparison</CardTitle>
        <CardDescription>Compare prices across different markets in Kenya</CardDescription>
        <div className="flex space-x-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {crops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="price" fill="var(--color-price)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Best Price</h4>
            <p className="text-2xl font-bold text-green-600">KSh {bestPrice}/kg</p>
            <p className="text-sm text-green-700">{bestMarket?.market} Market, {bestMarket?.location}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-800">Lowest Price</h4>
            <p className="text-2xl font-bold text-red-600">KSh {worstPrice}/kg</p>
            <p className="text-sm text-red-700">{worstMarket?.market} Market, {worstMarket?.location}</p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Price difference: KSh {bestPrice - worstPrice}/kg ({(((bestPrice - worstPrice) / worstPrice) * 100).toFixed(1)}% variation)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketComparison;
