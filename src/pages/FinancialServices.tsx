
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  FileText, 
  Calculator,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const FinancialServices = () => {
  const [activeTab, setActiveTab] = useState('loans');
  
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      location: '',
      farmSize: '',
      cropType: '',
      loanAmount: '',
      loanPurpose: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Loan application submitted:', data);
    toast({
      title: "Application Submitted",
      description: "Your loan application has been submitted successfully. We'll contact you within 48 hours.",
    });
    form.reset();
  };

  const loanProviders = [
    {
      name: "Equity Bank Kenya",
      type: "Commercial Bank",
      minAmount: "KSh 10,000",
      maxAmount: "KSh 5,000,000",
      interestRate: "12-18% p.a.",
      features: ["No collateral for amounts under KSh 100,000", "Quick approval process", "Mobile banking support"]
    },
    {
      name: "Kenya Women Microfinance Bank",
      type: "Microfinance",
      minAmount: "KSh 5,000",
      maxAmount: "KSh 500,000",
      interestRate: "15-20% p.a.",
      features: ["Women-focused lending", "Group lending available", "Financial literacy training"]
    },
    {
      name: "Agricultural Finance Corporation (AFC)",
      type: "Development Finance",
      minAmount: "KSh 20,000",
      maxAmount: "KSh 10,000,000",
      interestRate: "10-14% p.a.",
      features: ["Agriculture-specific loans", "Seasonal payment plans", "Technical support included"]
    },
    {
      name: "Faulu Microfinance Bank",
      type: "Microfinance",
      minAmount: "KSh 3,000",
      maxAmount: "KSh 300,000",
      interestRate: "16-22% p.a.",
      features: ["Village banking model", "No paperwork for small loans", "Insurance products available"]
    }
  ];

  const financialTips = [
    {
      title: "Build Your Credit Score",
      description: "Start with small loans and pay them back on time to build your credit history",
      icon: TrendingUp
    },
    {
      title: "Keep Detailed Records",
      description: "Maintain accurate records of farm income, expenses, and production cycles",
      icon: FileText
    },
    {
      title: "Diversify Income Streams",
      description: "Don't rely on one crop. Diversify to reduce financial risk",
      icon: Shield
    },
    {
      title: "Plan for Seasons",
      description: "Save during harvest season to cover expenses during planting season",
      icon: Calculator
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access loans, financial advice, and banking services designed specifically for Kenyan farmers
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white p-1 rounded-lg shadow">
            <button
              onClick={() => setActiveTab('loans')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'loans'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Loan Applications
            </button>
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'providers'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Loan Providers
            </button>
            <button
              onClick={() => setActiveTab('advice')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'advice'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Financial Advice
            </button>
          </div>
        </div>

        {/* Loan Application Form */}
        {activeTab === 'loans' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Apply for Agricultural Loan</span>
                </CardTitle>
                <CardDescription>
                  Fill out this form to start your loan application process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="0700 000 000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Location</FormLabel>
                          <FormControl>
                            <Input placeholder="County, Sub-county" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="farmSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Farm Size (Acres)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cropType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Crop</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Maize, Beans" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="loanAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Amount (KSh)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="loanPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Purpose</FormLabel>
                            <FormControl>
                              <Input placeholder="Seeds, Equipment, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Submit Application
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• National ID or Passport copy</li>
                    <li>• Farm ownership documents or lease agreement</li>
                    <li>• Recent bank statements (3 months)</li>
                    <li>• Farm production records (if available)</li>
                    <li>• Two passport-size photos</li>
                    <li>• Guarantor information (for loans above KSh 100,000)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">1</div>
                      <div>
                        <p className="font-medium">Submit Application</p>
                        <p className="text-gray-600">Complete the online form with accurate information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">2</div>
                      <div>
                        <p className="font-medium">Document Review</p>
                        <p className="text-gray-600">Our team reviews your application and documents</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">3</div>
                      <div>
                        <p className="font-medium">Farm Visit</p>
                        <p className="text-gray-600">Field officer visits your farm for assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">4</div>
                      <div>
                        <p className="font-medium">Approval & Disbursement</p>
                        <p className="text-gray-600">Loan approved and funds disbursed to your account</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Loan Providers */}
        {activeTab === 'providers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanProviders.map((provider, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{provider.name}</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {provider.type}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Loan Range</p>
                        <p className="text-gray-600">{provider.minAmount} - {provider.maxAmount}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Interest Rate</p>
                        <p className="text-gray-600">{provider.interestRate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Key Features</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {provider.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Contact {provider.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Financial Advice */}
        {activeTab === 'advice' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Planning for Farmers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Pre-Season Planning</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Calculate total input costs (seeds, fertilizer, labor)</li>
                        <li>• Estimate expected yield and income</li>
                        <li>• Plan cash flow throughout the growing season</li>
                        <li>• Consider crop insurance options</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">During Season</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Track actual vs. budgeted expenses</li>
                        <li>• Monitor crop progress and adjust plans</li>
                        <li>• Maintain emergency fund for unexpected costs</li>
                        <li>• Document all farm activities and expenses</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Post-Harvest</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Analyze profitability by crop and activity</li>
                        <li>• Save portion of income for next season</li>
                        <li>• Pay off any seasonal loans promptly</li>
                        <li>• Plan improvements for next growing cycle</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Financial Advisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Free Financial Consultation</h4>
                      <p className="text-green-700 text-sm mb-3">
                        Get personalized financial advice for your farming business
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Schedule Consultation
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">+254 700 000 000</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">finance@farmconnect.co.ke</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Nairobi, Kenya</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialServices;
