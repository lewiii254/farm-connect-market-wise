
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TruckIcon, 
  PackageIcon, 
  CalendarIcon, 
  BarChart3Icon, 
  ShieldCheckIcon,
  ClipboardCheckIcon,
  PlusIcon,
  SearchIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from "@/hooks/use-toast";

const SupplyChain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const shipments = [
    {
      id: 'SHP-2024-001',
      product: 'Maize (50kg bags)',
      quantity: '200',
      origin: 'Kitale',
      destination: 'Nairobi',
      departureDate: '2024-05-20',
      estimatedArrival: '2024-05-22',
      status: 'In Transit',
      statusColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'SHP-2024-002',
      product: 'Potatoes (100kg bags)',
      quantity: '150',
      origin: 'Meru',
      destination: 'Mombasa',
      departureDate: '2024-05-19',
      estimatedArrival: '2024-05-23',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'SHP-2024-003',
      product: 'French Beans (10kg crates)',
      quantity: '75',
      origin: 'Naivasha',
      destination: 'JKIA Export Terminal',
      departureDate: '2024-05-21',
      estimatedArrival: '2024-05-21',
      status: 'Processing',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'SHP-2024-004',
      product: 'Avocados (Export Grade)',
      quantity: '500 crates',
      origin: 'Muranga',
      destination: 'Mombasa Port',
      departureDate: '2024-05-18',
      estimatedArrival: '2024-05-24',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  const filteredShipments = shipments.filter(shipment => 
    shipment.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateShipment = () => {
    toast({
      title: "Create Shipment",
      description: "Shipment creation functionality coming soon!",
    });
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Shipment Details",
      description: `Details for shipment ${id} will be available soon!`,
    });
  };

  const handleTrackShipment = (id: string) => {
    toast({
      title: "Track Shipment",
      description: `Real-time tracking for shipment ${id} will be available soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Supply Chain Tracking</h1>
              <p className="mt-2 text-lg text-gray-600">
                Monitor your produce from farm to market across Kenya
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateShipment}>
              <PlusIcon className="h-4 w-4 mr-2" />
              New Shipment
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Shipments</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TruckIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold">925 kg</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PackageIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">On-Time Deliveries</p>
                  <p className="text-2xl font-bold">92%</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Product Quality</p>
                  <p className="text-2xl font-bold">High</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BarChart3Icon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipments List */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <CardTitle>Current Shipments</CardTitle>
              <div className="relative w-full md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search shipments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">Product</th>
                    <th className="px-4 py-3 text-left font-medium">Quantity</th>
                    <th className="px-4 py-3 text-left font-medium">Route</th>
                    <th className="px-4 py-3 text-left font-medium">Estimated Delivery</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium">{shipment.id}</td>
                        <td className="px-4 py-4">{shipment.product}</td>
                        <td className="px-4 py-4">{shipment.quantity}</td>
                        <td className="px-4 py-4">
                          {shipment.origin} → {shipment.destination}
                        </td>
                        <td className="px-4 py-4">{new Date(shipment.estimatedArrival).toLocaleDateString('en-KE')}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${shipment.statusColor}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(shipment.id)}
                            >
                              <ClipboardCheckIcon className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleTrackShipment(shipment.id)}
                            >
                              <TruckIcon className="h-3 w-3 mr-1" />
                              Track
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No shipments found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quality Control */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Certification</CardTitle>
            <CardDescription>Ensure your produce meets market standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quality Assurance Program</h3>
                    <p className="text-sm text-gray-500">Get your produce certified for better market access</p>
                  </div>
                </div>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full md:w-auto" 
                  onClick={() => {
                    toast({
                      title: "Quality Certification",
                      description: "Quality certification program registration coming soon!",
                    });
                  }}
                >
                  Register for Certification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChain;
