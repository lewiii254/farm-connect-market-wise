
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
  SearchIcon,
  MapPinIcon,
  FilterIcon,
  DownloadIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  LinkIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from "@/hooks/use-toast";
import BlockchainTraceability from '@/components/BlockchainTraceability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const SupplyChain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  
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
      statusColor: 'bg-amber-100 text-amber-800',
      progress: 65,
      driver: 'Peter Mwangi',
      vehicle: 'KBX 456T'
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
      statusColor: 'bg-green-100 text-green-800',
      progress: 100,
      driver: 'Jane Wanjiku',
      vehicle: 'KCA 123M'
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
      statusColor: 'bg-blue-100 text-blue-800',
      progress: 30,
      driver: 'Samuel Ochieng',
      vehicle: 'KCD 789P'
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
      statusColor: 'bg-green-100 text-green-800',
      progress: 100,
      driver: 'Mary Kimani',
      vehicle: 'KBY 321L'
    },
    {
      id: 'SHP-2024-005',
      product: 'Tomatoes (25kg crates)',
      quantity: '100',
      origin: 'Kajiado',
      destination: 'Nairobi',
      departureDate: '2024-05-22',
      estimatedArrival: '2024-05-23',
      status: 'Delayed',
      statusColor: 'bg-red-100 text-red-800',
      progress: 45,
      driver: 'John Kamau',
      vehicle: 'KCE 567N'
    }
  ];

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    activeShipments: shipments.filter(s => s.status === 'In Transit' || s.status === 'Processing').length,
    totalProducts: shipments.reduce((sum, s) => sum + parseInt(s.quantity), 0),
    onTimeDeliveries: Math.round((shipments.filter(s => s.status === 'Delivered').length / shipments.length) * 100),
    delayedShipments: shipments.filter(s => s.status === 'Delayed').length
  };

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
    setSelectedShipment(id);
    toast({
      title: "Shipment Tracking",
      description: `Viewing detailed tracking for shipment ${id}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Shipment data export functionality coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Supply Chain Management</h1>
              <p className="mt-2 text-lg text-gray-600">
                Monitor your produce from farm to market across Kenya with blockchain verification
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleExportData}
                className="flex items-center gap-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Export Data
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateShipment}>
                <PlusIcon className="h-4 w-4 mr-2" />
                New Shipment
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Shipments</p>
                  <p className="text-2xl font-bold">{stats.activeShipments}</p>
                  <p className="text-xs text-gray-500 mt-1">In transit & processing</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TruckIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  <p className="text-xs text-gray-500 mt-1">Units across all shipments</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PackageIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">On-Time Deliveries</p>
                  <p className="text-2xl font-bold">{stats.onTimeDeliveries}%</p>
                  <p className="text-xs text-gray-500 mt-1">Performance metric</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delayed Shipments</p>
                  <p className="text-2xl font-bold text-red-600">{stats.delayedShipments}</p>
                  <p className="text-xs text-gray-500 mt-1">Require attention</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircleIcon className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="shipments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="traceability">Blockchain Traceability</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments" className="space-y-6">{/* Shipments List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <CardTitle>Current Shipments</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-64">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search shipments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="in transit">In Transit</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </select>
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
                    <th className="px-4 py-3 text-left font-medium">Progress</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium">{shipment.id}</td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium">{shipment.product}</div>
                            <div className="text-xs text-gray-500">{shipment.driver}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{shipment.quantity}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{shipment.origin} → {shipment.destination}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  shipment.status === 'Delayed' ? 'bg-red-500' :
                                  shipment.status === 'Delivered' ? 'bg-green-500' :
                                  'bg-blue-500'
                                }`}
                                style={{ width: `${shipment.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{shipment.progress}%</span>
                          </div>
                        </td>
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

            {/* Selected Shipment Timeline */}
            {selectedShipment && (
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-green-600" />
                    Shipment Timeline - {selectedShipment}
                  </CardTitle>
                  <CardDescription>Real-time tracking and delivery milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Timeline items */}
                    <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-green-900">Shipment Created</h4>
                            <p className="text-sm text-green-700 mt-1">Order confirmed and prepared for dispatch</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">May 20, 2024 - 08:00 AM</p>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-green-900">Quality Check Passed</h4>
                            <p className="text-sm text-green-700 mt-1">All quality standards verified</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">May 20, 2024 - 10:30 AM</p>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-6 border-l-2 border-amber-300">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                        <ClockIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-amber-900">In Transit</h4>
                            <p className="text-sm text-amber-700 mt-1">Currently on route to destination</p>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800">Active</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">May 20, 2024 - 12:00 PM</p>
                        <div className="mt-2 text-xs text-amber-700">
                          <LinkIcon className="h-3 w-3 inline mr-1" />
                          Blockchain verified
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <ClockIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg opacity-60">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">Delivery Expected</h4>
                            <p className="text-sm text-gray-700 mt-1">Final delivery to destination</p>
                          </div>
                          <Badge className="bg-gray-200 text-gray-700">Pending</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">May 22, 2024 - 02:00 PM (Est.)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quality Control */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Certification</CardTitle>
                <CardDescription>Ensure your produce meets market standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3Icon className="h-5 w-5" />
                  Supply Chain Analytics
                </CardTitle>
                <CardDescription>Performance insights and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">Average Delivery Time</h4>
                      <TrendingUpIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-700">2.3 days</p>
                    <p className="text-sm text-blue-600 mt-1">↓ 0.5 days from last month</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-900">Success Rate</h4>
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-700">96.5%</p>
                    <p className="text-sm text-green-600 mt-1">↑ 2.3% from last month</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-purple-900">Cost Efficiency</h4>
                      <BarChart3Icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-700">KES 45/km</p>
                    <p className="text-sm text-purple-600 mt-1">↓ 12% from last month</p>
                  </div>
                </div>

                {/* Route Performance */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Top Routes by Volume</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                          <p className="font-medium">Kitale → Nairobi</p>
                          <p className="text-xs text-gray-500">Maize & Wheat</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">850 shipments</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                          <p className="font-medium">Muranga → Mombasa</p>
                          <p className="text-xs text-gray-500">Avocados & Fruits</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">620 shipments</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                          <p className="font-medium">Naivasha → JKIA</p>
                          <p className="text-xs text-gray-500">Export Produce</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">480 shipments</Badge>
                    </div>
                  </div>
                </div>

                {/* Monthly Trends */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Monthly Shipment Trends</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, idx) => {
                      const heights = [60, 75, 85, 70, 90];
                      return (
                        <div key={month} className="text-center">
                          <div className="bg-gray-100 rounded-lg overflow-hidden h-32 flex items-end">
                            <div 
                              className="w-full bg-gradient-to-t from-green-500 to-green-400"
                              style={{ height: `${heights[idx]}%` }}
                            ></div>
                          </div>
                          <p className="text-xs mt-2 text-gray-600">{month}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traceability" className="space-y-6">
            {/* Blockchain Traceability Component */}
            <BlockchainTraceability />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplyChain;
