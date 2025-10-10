import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind,
  Droplets,
  ThermometerSun,
  Calendar,
  Sprout,
  AlertTriangle,
  TrendingUp,
  Zap,
  MapPin,
  CloudDrizzle,
  Umbrella
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WeatherDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  farmingAdvice: string;
}

interface FarmingRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ElementType;
}

const WeatherAdvisor = () => {
  const [selectedLocation, setSelectedLocation] = useState('Nairobi County');

  // Sample weather data
  const weatherForecast: WeatherDay[] = [
    {
      date: '2024-12-15',
      day: 'Today',
      high: 26,
      low: 16,
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      precipitation: 20,
      humidity: 65,
      windSpeed: 15,
      farmingAdvice: 'Good day for planting. Soil moisture adequate.'
    },
    {
      date: '2024-12-16',
      day: 'Tomorrow',
      high: 24,
      low: 15,
      condition: 'Light Rain',
      icon: 'cloud-rain',
      precipitation: 60,
      humidity: 80,
      windSpeed: 20,
      farmingAdvice: 'Postpone spraying operations. Good for seedling growth.'
    },
    {
      date: '2024-12-17',
      day: 'Tuesday',
      high: 25,
      low: 16,
      condition: 'Sunny',
      icon: 'sun',
      precipitation: 10,
      humidity: 55,
      windSpeed: 12,
      farmingAdvice: 'Excellent for harvesting and field work.'
    },
    {
      date: '2024-12-18',
      day: 'Wednesday',
      high: 27,
      low: 17,
      condition: 'Sunny',
      icon: 'sun',
      precipitation: 5,
      humidity: 50,
      windSpeed: 10,
      farmingAdvice: 'Ideal for irrigation and pesticide application.'
    },
    {
      date: '2024-12-19',
      day: 'Thursday',
      high: 23,
      low: 14,
      condition: 'Heavy Rain',
      icon: 'cloud-rain',
      precipitation: 85,
      humidity: 90,
      windSpeed: 25,
      farmingAdvice: 'Avoid field work. Check drainage systems.'
    },
    {
      date: '2024-12-20',
      day: 'Friday',
      high: 24,
      low: 15,
      condition: 'Cloudy',
      icon: 'cloud',
      precipitation: 30,
      humidity: 70,
      windSpeed: 18,
      farmingAdvice: 'Good for transplanting. Monitor soil moisture.'
    },
    {
      date: '2024-12-21',
      day: 'Saturday',
      high: 26,
      low: 16,
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      precipitation: 15,
      humidity: 60,
      windSpeed: 14,
      farmingAdvice: 'Suitable for most farming activities.'
    }
  ];

  const recommendations: FarmingRecommendation[] = [
    {
      title: 'Planting Window',
      description: 'Tuesday-Wednesday optimal for maize planting. Soil temperature ideal at 18-22°C.',
      priority: 'high',
      icon: Sprout
    },
    {
      title: 'Irrigation Schedule',
      description: 'Skip irrigation Friday-Saturday due to expected rainfall. Resume Sunday if needed.',
      priority: 'high',
      icon: Droplets
    },
    {
      title: 'Pest Control',
      description: 'Thursday morning ideal for pesticide application - low wind, no rain predicted for 48hrs.',
      priority: 'medium',
      icon: Zap
    },
    {
      title: 'Harvest Timing',
      description: 'Tuesday-Thursday best for harvesting dry crops. Avoid Friday during heavy rain.',
      priority: 'medium',
      icon: Calendar
    }
  ];

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloud-rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'cloud-sun':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'cloud':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const counties = [
    'Nairobi County',
    'Kiambu County',
    'Nakuru County',
    'Meru County',
    'Kakamega County',
    'Kisumu County',
    'Mombasa County',
    'Machakos County'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Smart Weather Advisor</CardTitle>
              <CardDescription className="text-base">
                AI-powered weather forecasting with personalized farming recommendations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Location Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-gray-500" />
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {counties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-900">
          <strong>Heavy Rain Alert:</strong> Expected on Thursday (85% chance). Secure loose equipment and check drainage systems.
        </AlertDescription>
      </Alert>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Weather Forecast</CardTitle>
          <CardDescription>Extended forecast for {selectedLocation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherForecast.map((day) => (
              <div 
                key={day.date}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow"
              >
                <div className="text-center space-y-2">
                  <div className="font-semibold text-gray-900">{day.day}</div>
                  <div className="flex justify-center my-3">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="text-sm text-gray-600">{day.condition}</div>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="font-semibold text-red-600">{day.high}°</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600">{day.low}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                    <Droplets className="h-3 w-3" />
                    <span>{day.precipitation}%</span>
                  </div>
                  <div className="pt-2 border-t border-blue-200 mt-2">
                    <div className="text-xs text-gray-700 font-medium">{day.farmingAdvice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farming Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Farming Recommendations</CardTitle>
          <CardDescription>Personalized advice based on weather patterns and crop data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <rec.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <Badge className={`${getPriorityColor(rec.priority)} border text-xs`}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Avg. Humidity</div>
                <div className="text-2xl font-bold text-gray-900">68%</div>
                <div className="text-xs text-gray-500">This week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ThermometerSun className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Avg. Temperature</div>
                <div className="text-2xl font-bold text-gray-900">25°C</div>
                <div className="text-xs text-gray-500">This week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Umbrella className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Rainfall</div>
                <div className="text-2xl font-bold text-gray-900">45mm</div>
                <div className="text-xs text-gray-500">Expected this week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Benefits */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-green-600 rounded-full mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">25%</div>
              <div className="text-sm text-gray-600">Yield Increase</div>
              <div className="text-xs text-gray-500 mt-1">With optimal timing</div>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-blue-600 rounded-full mb-3">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">30%</div>
              <div className="text-sm text-gray-600">Water Savings</div>
              <div className="text-xs text-gray-500 mt-1">Smart irrigation timing</div>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-purple-600 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">7 Days</div>
              <div className="text-sm text-gray-600">Forecast Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">Plan ahead confidently</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherAdvisor;
