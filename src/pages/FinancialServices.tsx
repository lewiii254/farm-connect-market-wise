
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
  Zap
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
      features: ["No collateral required", "Quick approval", "M-Pesa disbursement"]
    },
    {
      name: "Equipment Financing",
      amount: "KSh 100,000 - 2,000,000",
      rate: "15% per annum", 
      term: "12-36 months",
      features: ["Asset-backed", "Flexible payments", "Insurance included"]
    },
    {
      name: "Emergency Fund",
      amount: "KSh 5,000 - 50,000",
      rate: "18% per annum",
      term: "3-6 months",
      features: ["Instant approval", "Same-day disbursement", "Pay via M-Pesa"]
    }
  ];

  const microfinancePartners = [
    { name: "Kenya Women Finance Trust", logo: "KWFT", rating: 4.5 },
    { name: "Faulu Microfinance", logo: "FMB", rating: 4.3 },
    { name: "SMEP Microfinance", logo: "SMEP", rating: 4.4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Financial Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access loans, savings, insurance, and mobile money services designed for Kenyan farmers
            </p>
          </div>

          <Tabs defaultValue="loans" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="loans" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {loanProducts.map((loan, index) => (
                  <Card key={index} className={`cursor-pointer transition-all ${
                    selectedLoan === index ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
                  }`} onClick={() => setSelectedLoan(index)}>
                    <CardHeader>
                      <CardTitle className="text-lg">{loan.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-green-600">
                        {loan.amount}
                      </CardDescription>
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
                    Microfinance Partners
                  </CardTitle>
                  <CardDescription>
                    Trusted partners offering competitive rates and flexible terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {microfinancePartners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">Rating: {partner.rating}/5</div>
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
                  <h3 className="text-2xl font-semibold mb-6">M-Pesa Services</h3>
                  <SafaricomServices />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Make a Payment</h3>
                  <MpesaPayment 
                    amount={15000} 
                    description="Sample Crop Purchase Payment"
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
                    FarmConnect M-Pesa Integration
                  </CardTitle>
                  <CardDescription>
                    Seamless mobile money integration for all your farming transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Available Services:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Buy and sell crops
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Pay for agricultural inputs
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Loan repayments
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Insurance premiums
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Benefits:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          Secure transactions
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-green-500" />
                          Instant payments
                        </li>
                        <li className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-green-500" />
                          No bank account needed
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
                      M-Shwari Savings
                    </CardTitle>
                    <CardDescription>
                      Save and earn interest on your farming income
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">4.5% p.a.</div>
                        <div className="text-sm text-blue-600">Interest Rate</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• No minimum balance</li>
                        <li>• Access via M-Pesa</li>
                        <li>• Monthly interest payments</li>
                        <li>• Lock savings for higher rates</li>
                      </ul>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Open M-Shwari Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Investment Options
                    </CardTitle>
                    <CardDescription>
                      Grow your wealth with agricultural investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Government Bonds</span>
                          <span className="text-green-600 font-medium">8-12%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Treasury Bills</span>
                          <span className="text-green-600 font-medium">6-8%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span>Money Market Funds</span>
                          <span className="text-green-600 font-medium">7-10%</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Explore Investments
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
                    <CardTitle>Crop Insurance</CardTitle>
                    <CardDescription>Protect your harvest from weather risks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-green-600">From KSh 500/acre</div>
                      <ul className="text-sm space-y-1">
                        <li>• Drought coverage</li>
                        <li>• Flood protection</li>
                        <li>• Pest damage</li>
                        <li>• Quick claims</li>
                      </ul>
                      <Button className="w-full">Get Quote</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Insurance</CardTitle>
                    <CardDescription>Cover your farming equipment and tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-blue-600">From KSh 1,000/month</div>
                      <ul className="text-sm space-y-1">
                        <li>• Tractors & machinery</li>
                        <li>• Tools & equipment</li>
                        <li>• Theft protection</li>
                        <li>• Accident coverage</li>
                      </ul>
                      <Button variant="outline" className="w-full">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Health Insurance</CardTitle>
                    <CardDescription>Healthcare coverage for farmers and families</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-purple-600">From KSh 2,500/year</div>
                      <ul className="text-sm space-y-1">
                        <li>• Outpatient services</li>
                        <li>• Emergency care</li>
                        <li>• Maternity benefits</li>
                        <li>• Family coverage</li>
                      </ul>
                      <Button variant="outline" className="w-full">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FinancialServices;
