
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Leaf, ShoppingCart, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { CropPurchaseDialog } from './CropPurchaseDialog';

interface CropListing {
  id: string;
  crop_name: string;
  quantity_kg: number;
  price_per_kg: number;
  location: string;
  farmer_id: string;
  harvest_date: string | null;
  available_from: string;
  available_until: string | null;
  description: string | null;
  is_organic: boolean | null;
  is_available: boolean | null;
  created_at: string;
}

const CropListings = ({ key }: { key?: number }) => {
  const [listings, setListings] = useState<CropListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [organicFilter, setOrganicFilter] = useState('');

  useEffect(() => {
    fetchListings();
  }, [key]);

  useEffect(() => {
    filterListings();
  }, [listings, searchTerm, locationFilter, cropFilter, organicFilter]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('crop_listings')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load crop listings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.crop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(listing => listing.location === locationFilter);
    }

    if (cropFilter) {
      filtered = filtered.filter(listing => listing.crop_name === cropFilter);
    }

    if (organicFilter === 'organic') {
      filtered = filtered.filter(listing => listing.is_organic === true);
    } else if (organicFilter === 'conventional') {
      filtered = filtered.filter(listing => listing.is_organic === false);
    }

    setFilteredListings(filtered);
  };

  // Safe helper to filter out empty or invalid values
  const getSafeSelectValue = (value: string): string | undefined => {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return undefined;
    }
    return value;
  };

  // Safe SelectItem renderer
  const renderSafeSelectItems = (items: string[]) => {
    return items
      .filter(item => item && typeof item === 'string' && item.trim().length > 0)
      .map((item) => (
        <SelectItem key={`select-item-${item}`} value={item}>
          {item}
        </SelectItem>
      ));
  };

  const uniqueLocations = [...new Set(listings.map(listing => listing.location))].filter(Boolean);
  const uniqueCrops = [...new Set(listings.map(listing => listing.crop_name))].filter(Boolean);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading crop listings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Find Fresh Crops</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Search crops or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:col-span-2"
          />
          
          <Select value={getSafeSelectValue(locationFilter)} onValueChange={(value) => setLocationFilter(value || '')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              {renderSafeSelectItems(uniqueLocations)}
            </SelectContent>
          </Select>

          <Select value={getSafeSelectValue(cropFilter)} onValueChange={(value) => setCropFilter(value || '')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-crops">All Crops</SelectItem>
              {renderSafeSelectItems(uniqueCrops)}
            </SelectContent>
          </Select>

          <Select value={getSafeSelectValue(organicFilter)} onValueChange={(value) => setOrganicFilter(value || '')}>
            <SelectTrigger>
              <SelectValue placeholder="Organic filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="organic">Organic Only</SelectItem>
              <SelectItem value="conventional">Conventional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Showing {filteredListings.length} of {listings.length} listings
        </div>
        <Button variant="outline" onClick={fetchListings}>
          <Filter className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{listing.crop_name}</CardTitle>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    KSh {listing.price_per_kg}/kg
                  </div>
                  <div className="text-sm text-gray-500">
                    {listing.quantity_kg} kg available
                  </div>
                </div>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {listing.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {listing.description && (
                <p className="text-sm text-gray-600">{listing.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2">
                {listing.is_organic && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Leaf className="h-3 w-3 mr-1" />
                    Organic
                  </Badge>
                )}
                {listing.harvest_date && (
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Harvested {new Date(listing.harvest_date).toLocaleDateString()}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Available from: {new Date(listing.available_from).toLocaleDateString()}</span>
                {listing.available_until && (
                  <span>Until: {new Date(listing.available_until).toLocaleDateString()}</span>
                )}
              </div>

              <CropPurchaseDialog
                listing={listing}
                trigger={
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now via M-Pesa
                  </Button>
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No crops found matching your criteria</div>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setLocationFilter('');
            setCropFilter('');
            setOrganicFilter('');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CropListings;
