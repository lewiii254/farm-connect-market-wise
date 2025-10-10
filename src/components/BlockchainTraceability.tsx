import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Shield, 
  CheckCircle,
  MapPin,
  Calendar,
  User,
  Leaf,
  Package,
  Truck,
  Store,
  Search,
  Award,
  Link as LinkIcon,
  Download,
  Share2,
  TrendingUp
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TraceabilityRecord {
  id: string;
  cropName: string;
  farmerName: string;
  farmLocation: string;
  plantingDate: string;
  harvestDate: string;
  certification: string[];
  transactions: Transaction[];
  currentStatus: string;
}

interface Transaction {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  party: string;
  verified: boolean;
  details: string;
}

const BlockchainTraceability = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  // Sample traceability data
  const sampleProduct: TraceabilityRecord = {
    id: 'FC-TOM-2024-001234',
    cropName: 'Organic Tomatoes',
    farmerName: 'John Kamau',
    farmLocation: 'Kiambu County, Limuru',
    plantingDate: '2024-09-15',
    harvestDate: '2024-11-20',
    certification: ['Organic Certified', 'GlobalGAP', 'Fair Trade'],
    currentStatus: 'In Transit to Market',
    transactions: [
      {
        id: '1',
        type: 'Planting',
        location: 'Farm Plot A-12, Limuru',
        timestamp: '2024-09-15 08:30 AM',
        party: 'John Kamau (Farmer)',
        verified: true,
        details: 'Seeds from certified organic supplier'
      },
      {
        id: '2',
        type: 'Certification',
        location: 'Farm Plot A-12, Limuru',
        timestamp: '2024-10-10 02:15 PM',
        party: 'Kenya Organic Certification Board',
        verified: true,
        details: 'Passed organic farming standards inspection'
      },
      {
        id: '3',
        type: 'Harvest',
        location: 'Farm Plot A-12, Limuru',
        timestamp: '2024-11-20 06:00 AM',
        party: 'John Kamau (Farmer)',
        verified: true,
        details: 'Harvested 500kg premium grade tomatoes'
      },
      {
        id: '4',
        type: 'Quality Check',
        location: 'FarmConnect Hub, Kiambu',
        timestamp: '2024-11-20 11:30 AM',
        party: 'FarmConnect Quality Team',
        verified: true,
        details: 'Grade A quality verified, moisture content optimal'
      },
      {
        id: '5',
        type: 'Packaging',
        location: 'FarmConnect Hub, Kiambu',
        timestamp: '2024-11-20 02:00 PM',
        party: 'FarmConnect Logistics',
        verified: true,
        details: 'Packed in food-grade containers, labeled and sealed'
      },
      {
        id: '6',
        type: 'In Transit',
        location: 'En route to Nairobi',
        timestamp: '2024-11-21 07:00 AM',
        party: 'FarmConnect Transport',
        verified: true,
        details: 'Temperature-controlled transport, ETA 3 hours'
      }
    ]
  };

  const handleSearch = () => {
    if (searchCode) {
      setSelectedProduct('FC-TOM-2024-001234');
    }
  };

  const generateQRCode = () => {
    setShowQR(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit to Market':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'At Market':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Sold':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Planting':
        return <Leaf className="h-5 w-5 text-green-600" />;
      case 'Certification':
        return <Award className="h-5 w-5 text-yellow-600" />;
      case 'Harvest':
        return <Package className="h-5 w-5 text-orange-600" />;
      case 'Quality Check':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'Packaging':
        return <Package className="h-5 w-5 text-purple-600" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-red-600" />;
      case 'At Market':
        return <Store className="h-5 w-5 text-green-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Immutable Records',
      description: 'Blockchain technology ensures data cannot be altered or tampered with'
    },
    {
      icon: QrCode,
      title: 'QR Code Tracking',
      description: 'Instant access to complete product history via QR scan'
    },
    {
      icon: Award,
      title: 'Certification Proof',
      description: 'Verified organic and quality certifications on the blockchain'
    },
    {
      icon: TrendingUp,
      title: 'Premium Pricing',
      description: 'Access export markets with 40-50% price premiums'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Blockchain Supply Chain Traceability</CardTitle>
              <CardDescription className="text-base">
                Complete transparency from farm to market with immutable blockchain records
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Card key={feature.title} className="border-gray-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 rounded-full mb-3">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Track Your Product</CardTitle>
          <CardDescription>
            Enter product ID or scan QR code to view complete supply chain journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Product ID (e.g., FC-TOM-2024-001234)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>

          <Alert>
            <QrCode className="h-4 w-4" />
            <AlertDescription>
              For buyers: Scan the QR code on product packaging to instantly verify authenticity and view origin details
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Product Traceability Results */}
      {selectedProduct && (
        <>
          {/* Product Overview */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{sampleProduct.cropName}</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Product ID: {sampleProduct.id}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(sampleProduct.currentStatus)} border px-4 py-2`}>
                  {sampleProduct.currentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <User className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Farmer</div>
                    <div className="font-semibold text-gray-900">{sampleProduct.farmerName}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold text-gray-900">{sampleProduct.farmLocation}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Planted</div>
                    <div className="font-semibold text-gray-900">{sampleProduct.plantingDate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Harvested</div>
                    <div className="font-semibold text-gray-900">{sampleProduct.harvestDate}</div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sampleProduct.certification.map((cert, index) => (
                    <Badge 
                      key={index} 
                      className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={generateQRCode}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Supply Chain Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Journey</CardTitle>
              <CardDescription>
                Complete blockchain-verified transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleProduct.transactions.map((transaction, index) => (
                  <div key={transaction.id} className="relative">
                    {/* Connecting line */}
                    {index < sampleProduct.transactions.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-purple-300 to-purple-100"></div>
                    )}
                    
                    <div className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-purple-100 rounded-full">
                          {getTransactionIcon(transaction.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {transaction.type}
                          </h3>
                          {transaction.verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{transaction.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{transaction.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{transaction.party}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {transaction.details}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-purple-600">
                          <LinkIcon className="h-3 w-3" />
                          <span className="font-mono">Block #45892 | Hash: 0x7a9f...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          {showQR && (
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Product QR Code</h3>
                  <div className="inline-block p-6 bg-white rounded-lg shadow-lg">
                    <div className="w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                      <QrCode className="h-48 w-48 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Scan this code to view complete product traceability information
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {sampleProduct.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-green-600 rounded-full mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">45%</div>
              <div className="text-sm text-gray-600">Price Premium</div>
              <div className="text-xs text-gray-500 mt-1">For traced organic produce</div>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-blue-600 rounded-full mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Transparency</div>
              <div className="text-xs text-gray-500 mt-1">Complete supply chain visibility</div>
            </div>
            <div className="text-center">
              <div className="inline-flex p-3 bg-purple-600 rounded-full mb-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">Export</div>
              <div className="text-sm text-gray-600">Market Access</div>
              <div className="text-xs text-gray-500 mt-1">EU & US compliance ready</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainTraceability;
