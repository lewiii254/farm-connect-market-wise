
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Package, Leaf } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CropListing {
  id: string;
  crop_name: string;
  price_per_kg: number;
  quantity_kg: number;
  location: string;
  harvest_date: string | null;
  available_from: string;
  available_until: string | null;
  is_organic: boolean;
  is_available: boolean;
  description: string | null;
  farmer_id: string;
}

const AVAILABLE_CROPS = [
  'Maize',
  'Beans',
  'Potatoes',
  'Tomatoes',
  'Kales (Sukuma Wiki)',
  'Avocados',
  'Bananas',
  'Carrots',
  'Onions',
  'Cabbage',
  'Spinach'
];

const KENYAN_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Nakuru',
  'Eldoret',
  'Kisumu',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Machakos',
  'Meru',
  'Nyeri',
  'Kericho'
];

const CropListings = ({ key }: { key?: number }) => {
  const [listings, setListings] = useState<CropListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    crop: '',
    location: '',
    maxPrice: '',
    organicOnly: false,
  });

  useEffect(() => {
    fetchListings();
  }, [key]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('crop_listings')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      console.error('Error fetching crop listings:', error);
      toast({
        title: "Error",
        description: "Failed to load crop listings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    if (filters.crop && listing.crop_name !== filters.crop) return false;
    if (filters.location && listing.location !== filters.location) return false;
    if (filters.maxPrice && listing.price_per_kg > parseFloat(filters.maxPrice)) return false;
    if (filters.organicOnly && !listing.is_organic) return false;
    return true;
  });

  const resetFilters = () => {
    setFilters({
      crop: '',
      location: '',
      maxPrice: '',
      organicOnly: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Crops</CardTitle>
          <CardDescription>
            Find the crops you're looking for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select 
                value={filters.crop || undefined} 
                onValueChange={(value) => setFilters({...filters, crop: value || ''})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any crop" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_CROPS.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select 
                value={filters.location || undefined} 
                onValueChange={(value) => setFilters({...filters, location: value || ''})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  {KENYAN_COUNTIES.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Max Price (KSh/kg)</Label>
              <Input
                type="number"
                placeholder="Any price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No crops found</h3>
            <p className="text-gray-500">
              {listings.length === 0 ? 'No crops are currently listed.' : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{listing.crop_name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="text-2xl font-bold text-green-600">
                      KSh {listing.price_per_kg}
                      <span className="text-sm text-gray-500 font-normal">/kg</span>
                    </div>
                    {listing.is_organic && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>{listing.quantity_kg} kg available</span>
                  </div>
                  {listing.harvest_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Harvested {new Date(listing.harvest_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {listing.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {listing.description}
                  </p>
                )}

                <div className="text-xs text-gray-500">
                  Available: {new Date(listing.available_from).toLocaleDateString()}
                  {listing.available_until && (
                    <span> - {new Date(listing.available_until).toLocaleDateString()}</span>
                  )}
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Contact Farmer
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CropListings;
