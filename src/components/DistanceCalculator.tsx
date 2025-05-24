
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Route } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const DistanceCalculator = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toMarket, setToMarket] = useState('');
  const [results, setResults] = useState<any>(null);

  const locations = [
    'Nakuru Town', 'Eldoret Town', 'Kisumu City', 'Mombasa City', 
    'Nyeri Town', 'Machakos Town', 'Kiambu Town', 'Nairobi City',
    'Kericho Town', 'Kitale Town', 'Thika Town', 'Meru Town'
  ];

  const markets = [
    { name: 'Wakulima Market', location: 'Nairobi', coordinates: { lat: -1.2921, lng: 36.8219 } },
    { name: 'Kongowea Market', location: 'Mombasa', coordinates: { lat: -4.0435, lng: 39.6682 } },
    { name: 'Nakuru Wholesale Market', location: 'Nakuru', coordinates: { lat: -0.3031, lng: 36.0800 } },
    { name: 'Karatina Market', location: 'Nyeri', coordinates: { lat: -0.4838, lng: 37.1285 } },
    { name: 'Eldoret Market', location: 'Eldoret', coordinates: { lat: 0.5143, lng: 35.2697 } },
    { name: 'Kisumu Fresh Produce Market', location: 'Kisumu', coordinates: { lat: -0.0917, lng: 34.7680 } }
  ];

  // Simplified distance calculation (in a real app, you'd use Google Maps API)
  const locationCoordinates: Record<string, { lat: number; lng: number }> = {
    'Nakuru Town': { lat: -0.3031, lng: 36.0800 },
    'Eldoret Town': { lat: 0.5143, lng: 35.2697 },
    'Kisumu City': { lat: -0.0917, lng: 34.7680 },
    'Mombasa City': { lat: -4.0435, lng: 39.6682 },
    'Nyeri Town': { lat: -0.4838, lng: 37.1285 },
    'Machakos Town': { lat: -1.5177, lng: 37.2634 },
    'Kiambu Town': { lat: -1.1715, lng: 36.8356 },
    'Nairobi City': { lat: -1.2921, lng: 36.8219 },
    'Kericho Town': { lat: -0.3676, lng: 35.2833 },
    'Kitale Town': { lat: 1.0167, lng: 35.0000 },
    'Thika Town': { lat: -1.0332, lng: 37.0692 },
    'Meru Town': { lat: 0.0467, lng: 37.6500 }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCalculate = () => {
    if (!fromLocation || !toMarket) {
      toast({
        title: "Missing Information",
        description: "Please select both your location and target market.",
        variant: "destructive"
      });
      return;
    }

    const fromCoords = locationCoordinates[fromLocation];
    const selectedMarket = markets.find(m => m.name === toMarket);
    
    if (!fromCoords || !selectedMarket) {
      toast({
        title: "Error",
        description: "Could not find coordinates for selected locations.",
        variant: "destructive"
      });
      return;
    }

    const distance = calculateDistance(
      fromCoords.lat, fromCoords.lng,
      selectedMarket.coordinates.lat, selectedMarket.coordinates.lng
    );

    const estimatedTime = distance / 60; // Assuming 60 km/h average speed
    const fuelCost = (distance / 12) * 150; // Assuming 12 km/l at KSh 150/l

    setResults({
      distance: Math.round(distance),
      time: estimatedTime,
      fuelCost: Math.round(fuelCost),
      market: selectedMarket
    });

    toast({
      title: "Distance Calculated",
      description: `${Math.round(distance)} km to ${selectedMarket.name}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <CardTitle>Distance & Transport Calculator</CardTitle>
        </div>
        <CardDescription>Calculate distance and transport costs to markets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Location</label>
              <Select value={fromLocation} onValueChange={setFromLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Target Market</label>
              <Select value={toMarket} onValueChange={setToMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target market" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map(market => (
                    <SelectItem key={market.name} value={market.name}>
                      {market.name} ({market.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleCalculate}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!fromLocation || !toMarket}
          >
            <Route className="h-4 w-4 mr-2" />
            Calculate Distance & Cost
          </Button>
          
          {results && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-3">
                Route: {fromLocation} → {results.market.name}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-green-700 font-medium">Distance</p>
                  <p className="text-green-900 text-lg font-bold">{results.distance} km</p>
                </div>
                <div>
                  <p className="text-green-700 font-medium">Est. Travel Time</p>
                  <p className="text-green-900 text-lg font-bold">{results.time.toFixed(1)} hours</p>
                </div>
                <div>
                  <p className="text-green-700 font-medium">Est. Fuel Cost</p>
                  <p className="text-green-900 text-lg font-bold">KSh {results.fuelCost}</p>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3">
                *Estimates based on 60 km/h average speed and 12 km/l fuel efficiency at KSh 150/l
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistanceCalculator;
