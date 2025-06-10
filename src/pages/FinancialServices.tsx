
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CreditCard, 
  PiggyBank, 
  Shield, 
  Calculator,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { LoanApplication } from '@/components/marketplace/LoanApplication';
import { toast } from "@/hooks/use-toast";

const FinancialServices = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loanProducts = [
    {
      id: '1',
      name: 'Seasonal Crop Loan',
      description: 'Short-term financing for seeds, fertilizers, and farming inputs',
      minAmount: 10000,
      maxAmount: 500000,
      interestRate: 8.5,
      maxTerm: 12,
      processingFee: 500,
      requirements: [
        'Valid national ID',
        'Farm ownership or lease documents',
        'M-Pesa account for at least 6 months',
        'Previous farming experience'
      ]
    },
    {
      id: '2', 
      name: 'Equipment Purchase Loan',
      description: 'Medium-term loans for agricultural equipment and machinery',
      minAmount: 50000,
      maxAmount: 2000000,
      interestRate: 12.0,
      maxTerm: 24,
      processingFee: 1000,
      requirements: [
        'Valid national ID',
        'Business registration (if applicable)',
        'Equipment quotation',
        'Down payment capability (20%)'
      ]
    },
    {
      id: '3',
      name: 'Emergency Farm Loan',
      description: 'Quick loans for urgent farming needs and emergencies',
      minAmount: 5000,
      maxAmount: 100000,
      interestRate: 15.0,
      maxTerm: 6,
      processingFee: 300,
      requirements: [
        'Valid national ID',
        'Active M-Pesa account',
        'Emergency documentation',
        'Guarantor (for amounts > KSh 50,000)'
      ]
    }
  ];

  const savingsProducts = [
    {
      name: 'Harvest Savings',
      description: 'Save for next season with competitive interest',
      rate: '6.5% p.a.',
      minAmount: 1000,
      features: ['Flexible deposits', 'Seasonal withdrawals', 'Mobile banking']
    },
    {
      name: 'Equipment Fund',
      description: 'Long-term savings for equipment purchase',
      rate: '7.2% p.a.',
      minAmount: 5000,
      features: ['Fixed monthly deposits', 'Goal-based saving', 'Equipment discounts']
    }
  ];

  const insuranceProducts = [
    {
      name: 'Crop Insurance',
      description: 'Protection against weather and pest damage',
      premium: 'From KSh 2,000/acre',
      coverage: 'Up to 80% of expected yield',
      features: ['Weather protection', 'Pest coverage', 'Quick claims']
    },
    {
      name: 'Equipment Insurance',
      description: 'Protect your farming equipment investment',
      premium: '3-5% of equipment value',
      coverage: 'Full replacement value',
      features: ['Theft protection', 'Damage coverage', 'Maintenance support']
    }
  ];

  const handleSavingsPayment = (productName: string, amount: number) => {
    return (transactionId: string) => {
      toast({
        title: "Savings Deposit Successful!",
        description: `KSh ${amount.toLocaleString()} deposited to ${productName}. Transaction: ${transactionId}`,
      });
    };
  };

  const handleInsurancePayment = (productName: string) => {
    return (transactionId: string) => {
      toast({
        title: "Insurance Premium Paid!",
        description: `${productName} premium payment successful. Policy activated. Transaction: ${transactionId}`,
      });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agricultural Financial Services</h1>
          <p className="mt-2 text-lg text-gray-600">
            Tailored financial solutions for Kenyan farmers with seamless M-Pesa integration
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Loans Disbursed</p>
                  <p className="text-2xl font-bold text-gray-900">KSh 12M+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Borrowers</p>
                  <p className="text-2xl font-bold text-gray-900">890+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. ROI</p>
                  <p className="text-2xl font-bold text-gray-900">23%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Repayment Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loans Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Agricultural Loans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanProducts.map((loan) => (
              <Card key={loan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    {loan.name}
                  </CardTitle>
                  <CardDescription>{loan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Amount Range:</span>
                      <div className="font-semibold">KSh {loan.minAmount.toLocaleString()} - {loan.maxAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Interest Rate:</span>
                      <div className="font-semibold text-green-600">{loan.interestRate}% p.a.</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Max Term:</span>
                      <div className="font-semibold">{loan.maxTerm} months</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Processing Fee:</span>
                      <div className="font-semibold">KSh {loan.processingFee}</div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Apply Now via M-Pesa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Loan Application</DialogTitle>
                        <DialogDescription>
                          Complete your application for {loan.name}
                        </DialogDescription>
                      </DialogHeader>
                      <LoanApplication loanProduct={loan} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Savings Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savingsProducts.map((savings, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-blue-600" />
                    {savings.name}
                  </CardTitle>
                  <CardDescription>{savings.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest Rate:</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{savings.rate}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Minimum Amount:</span>
                    <span className="font-semibold">KSh {savings.minAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-gray-600">Features:</span>
                    <ul className="space-y-1">
                      {savings.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MpesaServicePayment
                    serviceName={`${savings.name} Deposit`}
                    amount={savings.minAmount}
                    description={`Initial deposit for ${savings.name}`}
                    onSuccess={handleSavingsPayment(savings.name, savings.minAmount)}
                    buttonText={`Start Saving - KSh ${savings.minAmount.toLocaleString()}`}
                    buttonVariant="outline"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Insurance Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceProducts.map((insurance, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    {insurance.name}
                  </CardTitle>
                  <CardDescription>{insurance.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Premium:</span>
                      <div className="font-semibold">{insurance.premium}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Coverage:</span>
                      <div className="font-semibold text-purple-600">{insurance.coverage}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-gray-600">Features:</span>
                    <ul className="space-y-1">
                      {insurance.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MpesaServicePayment
                    serviceName={`${insurance.name} Premium`}
                    amount={2000}
                    description={`Premium payment for ${insurance.name}`}
                    onSuccess={handleInsurancePayment(insurance.name)}
                    buttonText="Pay Premium via M-Pesa"
                    buttonVariant="outline"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-green-800">Why Choose FarmConnect Financial Services?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Smartphone className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">M-Pesa Integration</h3>
                <p className="text-sm text-green-700">All transactions through your mobile phone</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Competitive Rates</h3>
                <p className="text-sm text-blue-700">Best interest rates for agricultural financing</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Quick Approval</h3>
                <p className="text-sm text-purple-700">Fast processing with minimal documentation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialServices;
