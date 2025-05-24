
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const CropSeasonality = () => {
  const seasonalityData = [
    {
      crop: 'Maize',
      plantingSeason: 'March-May (Long rains), October-December (Short rains)',
      harvestSeason: 'August-September, February-March',
      peakAvailability: 'August-October, February-April',
      status: 'in-season'
    },
    {
      crop: 'Beans',
      plantingSeason: 'March-May, October-December',
      harvestSeason: 'June-July, January-February',
      peakAvailability: 'June-August, January-March',
      status: 'peak'
    },
    {
      crop: 'Potatoes',
      plantingSeason: 'Year-round (varies by region)',
      harvestSeason: '3-4 months after planting',
      peakAvailability: 'December-February, June-August',
      status: 'off-season'
    },
    {
      crop: 'Tomatoes',
      plantingSeason: 'Year-round (greenhouse), March-May (outdoor)',
      harvestSeason: '3-4 months after planting',
      peakAvailability: 'Year-round (varies by region)',
      status: 'in-season'
    },
    {
      crop: 'Kales (Sukuma Wiki)',
      plantingSeason: 'Year-round',
      harvestSeason: '6-8 weeks after planting',
      peakAvailability: 'Year-round',
      status: 'peak'
    },
    {
      crop: 'Avocados',
      plantingSeason: 'March-May (trees)',
      harvestSeason: 'March-September (main season)',
      peakAvailability: 'May-August',
      status: 'off-season'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'peak':
        return 'bg-green-100 text-green-800';
      case 'in-season':
        return 'bg-blue-100 text-blue-800';
      case 'off-season':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'peak':
        return 'Peak Season';
      case 'in-season':
        return 'In Season';
      case 'off-season':
        return 'Off Season';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-600" />
          <CardTitle>Crop Seasonality Guide</CardTitle>
        </div>
        <CardDescription>Understand planting and harvest seasons for optimal timing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {seasonalityData.map((crop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{crop.crop}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                  {getStatusText(crop.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Planting Season</p>
                  <p className="text-gray-600">{crop.plantingSeason}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Harvest Season</p>
                  <p className="text-gray-600">{crop.harvestSeason}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Peak Availability</p>
                  <p className="text-gray-600">{crop.peakAvailability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Seasonal Pricing Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Prices are typically lowest during peak availability periods</li>
            <li>• Off-season crops command higher prices but may have limited supply</li>
            <li>• Plan your planting to avoid oversupply during harvest seasons</li>
            <li>• Consider greenhouse farming for year-round production</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropSeasonality;
