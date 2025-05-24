
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const PriceCharts = () => {
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  const [timeRange, setTimeRange] = useState('6months');
  
  const crops = ['Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)', 'Avocados'];
  
  const historicalData = {
    'Maize': {
      '6months': [
        { month: 'Aug', price: 42 },
        { month: 'Sep', price: 44 },
        { month: 'Oct', price: 46 },
        { month: 'Nov', price: 43 },
        { month: 'Dec', price: 45 },
        { month: 'Jan', price: 45 },
      ],
      '1year': [
        { month: 'Feb 23', price: 38 },
        { month: 'Apr 23', price: 40 },
        { month: 'Jun 23', price: 42 },
        { month: 'Aug 23', price: 44 },
        { month: 'Oct 23', price: 46 },
        { month: 'Dec 23', price: 43 },
        { month: 'Feb 24', price: 45 },
      ]
    },
    'Beans': {
      '6months': [
        { month: 'Aug', price: 115 },
        { month: 'Sep', price: 118 },
        { month: 'Oct', price: 122 },
        { month: 'Nov', price: 119 },
        { month: 'Dec', price: 120 },
        { month: 'Jan', price: 120 },
      ],
      '1year': [
        { month: 'Feb 23', price: 110 },
        { month: 'Apr 23', price: 112 },
        { month: 'Jun 23', price: 115 },
        { month: 'Aug 23', price: 118 },
        { month: 'Oct 23', price: 122 },
        { month: 'Dec 23', price: 119 },
        { month: 'Feb 24', price: 120 },
      ]
    },
    'Potatoes': {
      '6months': [
        { month: 'Aug', price: 35 },
        { month: 'Sep', price: 36 },
        { month: 'Oct', price: 39 },
        { month: 'Nov', price: 37 },
        { month: 'Dec', price: 38 },
        { month: 'Jan', price: 38 },
      ],
      '1year': [
        { month: 'Feb 23', price: 32 },
        { month: 'Apr 23', price: 34 },
        { month: 'Jun 23', price: 35 },
        { month: 'Aug 23', price: 36 },
        { month: 'Oct 23', price: 39 },
        { month: 'Dec 23', price: 37 },
        { month: 'Feb 24', price: 38 },
      ]
    },
    'Tomatoes': {
      '6months': [
        { month: 'Aug', price: 78 },
        { month: 'Sep', price: 82 },
        { month: 'Oct', price: 88 },
        { month: 'Nov', price: 85 },
        { month: 'Dec', price: 83 },
        { month: 'Jan', price: 85 },
      ],
      '1year': [
        { month: 'Feb 23', price: 72 },
        { month: 'Apr 23', price: 75 },
        { month: 'Jun 23', price: 78 },
        { month: 'Aug 23', price: 82 },
        { month: 'Oct 23', price: 88 },
        { month: 'Dec 23', price: 85 },
        { month: 'Feb 24', price: 85 },
      ]
    },
    'Kales (Sukuma Wiki)': {
      '6months': [
        { month: 'Aug', price: 22 },
        { month: 'Sep', price: 23 },
        { month: 'Oct', price: 26 },
        { month: 'Nov', price: 24 },
        { month: 'Dec', price: 25 },
        { month: 'Jan', price: 25 },
      ],
      '1year': [
        { month: 'Feb 23', price: 20 },
        { month: 'Apr 23', price: 21 },
        { month: 'Jun 23', price: 22 },
        { month: 'Aug 23', price: 23 },
        { month: 'Oct 23', price: 26 },
        { month: 'Dec 23', price: 24 },
        { month: 'Feb 24', price: 25 },
      ]
    },
    'Avocados': {
      '6months': [
        { month: 'Aug', price: 32 },
        { month: 'Sep', price: 33 },
        { month: 'Oct', price: 36 },
        { month: 'Nov', price: 34 },
        { month: 'Dec', price: 35 },
        { month: 'Jan', price: 35 },
      ],
      '1year': [
        { month: 'Feb 23', price: 28 },
        { month: 'Apr 23', price: 30 },
        { month: 'Jun 23', price: 32 },
        { month: 'Aug 23', price: 33 },
        { month: 'Oct 23', price: 36 },
        { month: 'Dec 23', price: 34 },
        { month: 'Feb 24', price: 35 },
      ]
    },
  };

  const chartConfig = {
    price: {
      label: "Price (KSh/kg)",
      color: "#22c55e"
    }
  };

  const currentData = historicalData[selectedCrop as keyof typeof historicalData]?.[timeRange as keyof typeof historicalData['Maize']] || [];
  
  const currentPrice = currentData[currentData.length - 1]?.price || 0;
  const previousPrice = currentData[currentData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = previousPrice ? ((priceChange / previousPrice) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Price Trends</CardTitle>
        <CardDescription>Track price movements over time</CardDescription>
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
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Price</p>
              <p className="text-2xl font-bold">KSh {currentPrice}/kg</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Monthly Change</p>
              <p className={`text-lg font-medium ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}KSh {priceChange.toFixed(1)} ({percentChange.toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-price)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-price)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PriceCharts;
