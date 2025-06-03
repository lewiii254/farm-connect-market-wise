
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Leaf, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CropListing {
  id: string;
  crop_name: string;
  quantity_kg: number;
  price_per_kg: number;
  description: string | null;
  location: string;
  harvest_date: string | null;
  available_until: string | null;
  is_organic: boolean;
  is_available: boolean;
  created_at: string;
  farmer_id: string;
}

const CropListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<CropListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<CropListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, searchTerm, locationFilter, cropFilter]);

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
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load crop listings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.crop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(listing => listing.location === locationFilter);
    }

    if (cropFilter) {
      filtered = filtered.filter(listing => listing.crop_name === cropFilter);
    }

    setFilteredListings(filtered);
  };

  const handleContactFarmer = (listing: CropListing) => {
    toast({
      title: "Contact Feature",
      description: "Direct messaging feature will be available soon!",
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const uniqueLocations = [...new Set(listings.map(l => l.location))];
  const uniqueCrops = [...new Set(listings.map(l => l.crop_name))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Crops</CardTitle>
          <CardDescription>Search and filter available crop listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All crops</SelectItem>
                {uniqueCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setCropFilter('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="hover-scale">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-green-700">{listing.crop_name}</CardTitle>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold">{listing.quantity_kg} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold text-green-600">KSh {listing.price_per_kg}/kg</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="font-bold text-lg text-green-700">
                  KSh {(listing.quantity_kg * listing.price_per_kg).toLocaleString()}
                </p>
              </div>

              {listing.description && (
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm mt-1">{listing.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                {listing.harvest_date && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Harvested: {formatDate(listing.harvest_date)}</span>
                  </div>
                )}
                {listing.available_until && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Until: {formatDate(listing.available_until)}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => handleContactFarmer(listing)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Farmer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No crop listings found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setLocationFilter('');
              setCropFilter('');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropListings;
