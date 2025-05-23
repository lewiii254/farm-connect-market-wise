import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, Users } from 'lucide-react';

const Buyers = () => {
  const buyers = [
    {
      name: 'Nairobi Fresh Grocers',
      type: 'Grocery Chain',
      location: '2.3 km away',
      rating: 4.8,
      products: ['Vegetables', 'Fruits', 'Herbs'],
      phone: '+254 712 345 678',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Tuskys Supermarket',
      type: 'Retail Chain',
      location: '5.1 km away',
      rating: 4.9,
      products: ['Organic Produce', 'Seasonal Fruits'],
      phone: '+254 723 456 789',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Mombasa Wholesale Hub',
      type: 'Wholesale',
      location: '8.7 km away',
      rating: 4.5,
      products: ['Bulk Vegetables', 'Grains', 'Cereals'],
      phone: '+254 734 567 890',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kenya Organic Network',
      type: 'Cooperative',
      location: '12.4 km away',
      rating: 4.7,
      products: ['Organic Produce', 'Indigenous Crops'],
      phone: '+254 745 678 901',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Buyers</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with verified buyers and markets across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {buyers.map((buyer, index) => (
                <Card key={index} className="hover-scale">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gray-200 rounded-l-lg overflow-hidden">
                      <img 
                        src={buyer.image} 
                        alt={buyer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{buyer.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Users className="h-4 w-4 mr-1" />
                              {buyer.type}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{buyer.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {buyer.location}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {buyer.products.map((product, idx) => (
                              <span 
                                key={idx}
                                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                              >
                                {product}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-1" />
                              {buyer.phone}
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Map View</CardTitle>
                <CardDescription>Buyers and markets near you in Kenya</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map coming soon!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      View buyers across Kenya on an interactive map
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Supermarkets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Local Markets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Wholesale Buyers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Exporters
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyers;
