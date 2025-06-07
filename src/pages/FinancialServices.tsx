
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Users, 
  Calculator,
  Banknote,
  PiggyBank,
  Zap,
  Tractor,
  Sprout,
  Droplets
} from 'lucide-react';
import { MpesaPayment, SafaricomServices } from '@/components/MpesaIntegration';

const FinancialServices = () => {
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);

  const loanProducts = [
    {
      name: "Seasonal Crop Loan",
      amount: "KSh 50,000 - 500,000",
      rate: "12% per annum",
      term: "6-12 months",
      features: ["No collateral required", "Quick approval", "M-Pesa disbursement"],
      description: "Perfect for seed purchase, fertilizers, and seasonal farming inputs",
      icon: Sprout
    },
    {
      name: "Farm Equipment Financing",
      amount: "KSh 100,000 - 2,000,000",
      rate: "15% per annum", 
      term: "12-36 months",
      features: ["Asset-backed", "Flexible payments", "Insurance included"],
      description: "Finance tractors, irrigation systems, and modern farming equipment",
      icon: Tractor
    },
    {
      name: "Emergency Farm Fund",
      amount: "KSh 5,000 - 50,000",
      rate: "18% per annum",
      term: "3-6 months",
      features: ["Instant approval", "Same-day disbursement", "Pay via M-Pesa"],
      description: "Quick access to funds for pest control, drought mitigation, or urgent repairs",
      icon: Shield
    }
  ];

  const agriculturalPartners = [
    { name: "Kenya Women Finance Trust (Agri)", logo: "KWFT", rating: 4.5, specialty: "Women farmers & cooperatives" },
    { name: "Faulu Microfinance (Farm Focus)", logo: "FMB", rating: 4.3, specialty: "Smallholder financing" },
    { name: "SMEP Agricultural Finance", logo: "SMEP", rating: 4.4, specialty: "Value chain financing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Agricultural Financial Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored financial solutions for Kenyan farmers - from crop loans to equipment financing, all integrated with M-Pesa for seamless farm-to-market transactions
            </p>
          </div>

          <Tabs defaultValue="loans" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="loans">Farm Loans</TabsTrigger>
              <TabsTrigger value="mpesa">Farm Payments</TabsTrigger>
              <TabsTrigger value="savings">Farm Savings</TabsTrigger>
              <TabsTrigger value="insurance">Farm Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="loans" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {loanProducts.map((loan, index) => (
                  <Card key={index} className={`cursor-pointer transition-all ${
                    selectedLoan === index ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
                  }`} onClick={() => setSelectedLoan(index)}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <loan.icon className="h-5 w-5 text-green-600" />
                        {loan.name}
                      </CardTitle>
                      <CardDescription className="text-2xl font-bold text-green-600">
                        {loan.amount}
                      </CardDescription>
                      <p className="text-sm text-gray-600">{loan.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Interest Rate:</span>
                          <span className="font-medium">{loan.rate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Repayment:</span>
                          <span className="font-medium">{loan.term}</span>
                        </div>
                        <div className="space-y-2">
                          {loan.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Agricultural Finance Partners
                  </CardTitle>
                  <CardDescription>
                    Trusted partners specializing in agricultural financing with deep understanding of farming cycles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {agriculturalPartners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">Rating: {partner.rating}/5</div>
                          <div className="text-xs text-green-600">{partner.specialty}</div>
                        </div>
                        <Badge variant="outline">{partner.logo}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mpesa" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">FarmConnect M-Pesa Services</h3>
                  <SafaricomServices />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Pay for Agricultural Products</h3>
                  <MpesaPayment 
                    amount={15000} 
                    description="Sample Payment - Quality Maize Purchase"
                    onSuccess={(transactionId) => {
                      console.log('Payment successful:', transactionId);
                    }}
                    onError={(error) => {
                      console.error('Payment failed:', error);
                    }}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-green-600" />
                    Agricultural M-Pesa Integration
                  </CardTitle>
                  <CardDescription>
                    Seamless mobile money for all your farming transactions - from seed purchase to crop sales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Farm Transaction Services:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Sell crops directly to verified buyers
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Purchase quality seeds and fertilizers
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Pay for farm equipment rentals
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Receive loan disbursements instantly
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Pay agricultural insurance premiums
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">FarmConnect Benefits:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          Secure farm-to-market payments
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-green-500" />
                          Instant payment confirmations
                        </li>
                        <li className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-green-500" />
                          No bank account needed
                        </li>
                        <li className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          Transaction history tracking
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="savings" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5 text-blue-600" />
                      Farm Income Savings (M-Shwari)
                    </CardTitle>
                    <CardDescription>
                      Save your harvest income and earn interest - perfect for planning next season's investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">4.5% p.a.</div>
                        <div className="text-sm text-blue-600">Interest Rate on Farm Savings</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Save harvest proceeds for next season</li>
                        <li>• Access via M-Pesa for easy deposits</li>
                        <li>• Monthly interest payments</li>
                        <li>• Lock savings for higher rates during off-season</li>
                        <li>• Emergency withdrawal for farm needs</li>
                      </ul>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Open Farm Savings Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Agricultural Investment Plans
                    </CardTitle>
                    <CardDescription>
                      Grow your farm wealth with agriculture-focused investment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Agricultural Bonds</span>
                          <span className="text-green-600 font-medium">8-12%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Farm Development Treasury Bills</span>
                          <span className="text-green-600 font-medium">6-8%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Agricultural Money Market</span>
                          <span className="text-green-600 font-medium">7-10%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 p-3 bg-green-50 rounded">
                        💡 Tip: Invest during harvest season for maximum returns before next planting cycle
                      </div>
                      <Button variant="outline" className="w-full">
                        Explore Farm Investments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      Crop Weather Insurance
                    </CardTitle>
                    <CardDescription>Protect your harvest from climate risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-green-600">From KSh 500/acre</div>
                      <ul className="text-sm space-y-1">
                        <li>• Drought coverage for all crops</li>
                        <li>• Flood protection during rainy season</li>
                        <li>• Hailstorm damage compensation</li>
                        <li>• Quick M-Pesa claims settlement</li>
                        <li>• Satellite weather monitoring</li>
                      </ul>
                      <Button className="w-full">Get Farm Quote</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tractor className="h-5 w-5 text-orange-500" />
                      Farm Equipment Protection
                    </CardTitle>
                    <CardDescription>Secure your farming investments and tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-blue-600">From KSh 1,000/month</div>
                      <ul className="text-sm space-y-1">
                        <li>• Tractors & machinery coverage</li>
                        <li>• Irrigation equipment protection</li>
                        <li>• Tools & implement insurance</li>
                        <li>• Theft protection in rural areas</li>
                        <li>• Breakdown & repair coverage</li>
                      </ul>
                      <Button variant="outline" className="w-full">Protect Equipment</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Farmer Family Health Cover
                    </CardTitle>
                    <CardDescription>Healthcare for farming families and workers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-purple-600">From KSh 2,500/year</div>
                      <ul className="text-sm space-y-1">
                        <li>• Rural clinic access</li>
                        <li>• Emergency medical care</li>
                        <li>• Maternity benefits for farm families</li>
                        <li>• Seasonal worker coverage</li>
                        <li>• Agricultural accident protection</li>
                      </ul>
                      <Button variant="outline" className="w-full">Enroll Family</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">🌾 FarmConnect Insurance Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 mb-4">
                    Partner with leading agricultural insurers in Kenya to provide comprehensive coverage tailored for modern farming needs. All premiums can be paid via M-Pesa with flexible payment schedules aligned to your harvest cycles.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="font-bold text-green-800">95%</div>
                      <div className="text-sm text-green-600">Claims Settled</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="font-bold text-green-800">48 Hours</div>
                      <div className="text-sm text-green-600">Average Claim Time</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="font-bold text-green-800">KSh 150M+</div>
                      <div className="text-sm text-green-600">Claims Paid Out</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FinancialServices;
