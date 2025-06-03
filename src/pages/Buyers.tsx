
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CropListings from '@/components/marketplace/CropListings';
import BuyerProfile from '@/components/marketplace/BuyerProfile';
import CropListingForm from '@/components/marketplace/CropListingForm';

const Buyers = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with farmers and buyers across Kenya
          </p>
        </div>

        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="listings">Browse Crops</TabsTrigger>
            <TabsTrigger value="create">List Crops</TabsTrigger>
            <TabsTrigger value="profile">Buyer Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="space-y-6">
            <CropListings key={refreshKey} />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-6">
            <CropListingForm onSuccess={handleListingSuccess} />
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <BuyerProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Buyers;
