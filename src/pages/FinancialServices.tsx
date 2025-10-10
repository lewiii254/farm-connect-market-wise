
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  PiggyBank, 
  Shield, 
  Calculator,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Award,
  Clock,
  Target,
  HelpCircle,
  BookOpen,
  LineChart,
  DollarSign,
  Percent,
  Calendar,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { LoanApplication } from '@/components/marketplace/LoanApplication';
import { toast } from "@/hooks/use-toast";

const FinancialServices = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeTab, setActiveTab] = useState("loans");
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [savingsAmount, setSavingsAmount] = useState(5000);
  const [savingsPeriod, setSavingsPeriod] = useState(12);

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

  const testimonials = [
    {
      name: "John Kamau",
      role: "Maize Farmer, Nakuru",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The seasonal crop loan helped me double my harvest. The M-Pesa integration made repayment so easy!"
    },
    {
      name: "Mary Wanjiru",
      role: "Dairy Farmer, Kiambu",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Equipment loan transformed my farm. Now I have modern dairy equipment and my income tripled!"
    },
    {
      name: "Peter Omondi",
      role: "Horticulture Farmer, Meru",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The savings program helped me prepare for the next season. Great returns and flexible withdrawals!"
    }
  ];

  const faqs = [
    {
      question: "What documents do I need for a loan?",
      answer: "You need a valid national ID, farm ownership/lease documents, and an active M-Pesa account for at least 6 months."
    },
    {
      question: "How long does loan approval take?",
      answer: "Most loans are approved within 24-48 hours after submitting all required documents and paying the processing fee."
    },
    {
      question: "Can I repay my loan early?",
      answer: "Yes! Early repayment is encouraged and you'll save on interest. No penalties for early repayment."
    },
    {
      question: "What happens if I miss a payment?",
      answer: "We understand farming challenges. Contact us immediately - we offer flexible rescheduling options during difficult seasons."
    },
    {
      question: "Is crop insurance really necessary?",
      answer: "Highly recommended! Weather and pest uncertainties can impact your harvest. Insurance protects your investment and income."
    }
  ];

  const calculateLoanRepayment = () => {
    const interestRate = loanProducts[0].interestRate; // Using first loan product's rate as default
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    return { monthlyPayment, totalPayment, totalInterest };
  };

  const calculateSavingsProjection = () => {
    const interestRate = 6.5; // Savings rate from savingsProducts
    const monthlyRate = interestRate / 100 / 12;
    const futureValue = savingsAmount * ((Math.pow(1 + monthlyRate, savingsPeriod) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalDeposits = savingsAmount * savingsPeriod;
    const totalInterest = futureValue - totalDeposits;
    return { futureValue, totalDeposits, totalInterest };
  };

  // Memoize calculator results to avoid redundant calculations
  const loanRepayment = calculateLoanRepayment();
  const savingsProjection = calculateSavingsProjection();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-lg rotate-45 opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-200 rounded-lg rotate-12 opacity-20 animate-bounce"></div>

      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-800 text-sm font-medium mb-6 border border-green-200 shadow-sm animate-fade-in">
            <Shield className="h-4 w-4 mr-2" />
            Trusted by 890+ Kenyan Farmers
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            Agricultural <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">Financial Services</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in">
            Tailored financial solutions for Kenyan farmers with seamless M-Pesa integration
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Loans Disbursed</p>
                  <p className="text-2xl font-bold text-gray-900">KSh 12M+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Borrowers</p>
                  <p className="text-2xl font-bold text-gray-900">890+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. ROI</p>
                  <p className="text-2xl font-bold text-gray-900">23%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Repayment Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-md">
            <TabsTrigger value="loans" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <PiggyBank className="h-4 w-4 mr-2" />
              Savings
            </TabsTrigger>
            <TabsTrigger value="insurance" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Insurance
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-8">
            {/* Loan Calculator */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Calculator className="h-6 w-6" />
                  Loan Calculator
                </CardTitle>
                <CardDescription>Calculate your monthly payments and total costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount (KSh)</Label>
                      <Input 
                        id="loanAmount" 
                        type="number" 
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                      <Input 
                        id="loanTerm" 
                        type="number" 
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-4">Your Repayment Plan</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="text-xl font-bold text-green-600">
                          KSh {loanRepayment.monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Payment:</span>
                        <span className="font-semibold text-gray-900">
                          KSh {loanRepayment.totalPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-gray-900">
                          KSh {loanRepayment.totalInterest.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

                {/* Loans Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agricultural Loans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanProducts.map((loan) => (
                <Card key={loan.id} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      {loan.name}
                    </CardTitle>
                    <CardDescription>{loan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Amount Range:</span>
                        <div className="font-semibold text-gray-900 mt-1">KSh {loan.minAmount.toLocaleString()} - {loan.maxAmount.toLocaleString()}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Interest Rate:</span>
                        <div className="font-semibold text-green-600 mt-1">{loan.interestRate}% p.a.</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Max Term:</span>
                        <div className="font-semibold text-blue-600 mt-1">{loan.maxTerm} months</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Processing Fee:</span>
                        <div className="font-semibold text-purple-600 mt-1">KSh {loan.processingFee}</div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all">
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
          </TabsContent>

          {/* Savings Tab */}
          <TabsContent value="savings" className="space-y-8">
            {/* Savings Calculator */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <LineChart className="h-6 w-6" />
                  Savings Projector
                </CardTitle>
                <CardDescription>See how your savings can grow over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="savingsAmount">Monthly Deposit (KSh)</Label>
                      <Input 
                        id="savingsAmount" 
                        type="number" 
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="savingsPeriod">Saving Period (Months)</Label>
                      <Input 
                        id="savingsPeriod" 
                        type="number" 
                        value={savingsPeriod}
                        onChange={(e) => setSavingsPeriod(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-4">Your Savings Growth</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Future Value:</span>
                        <span className="text-xl font-bold text-blue-600">
                          KSh {savingsProjection.futureValue.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Deposits:</span>
                        <span className="font-semibold text-gray-900">
                          KSh {savingsProjection.totalDeposits.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Interest Earned:</span>
                        <span className="font-semibold text-green-600">
                          KSh {savingsProjection.totalInterest.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Products */}
            {/* Savings Products */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savingsProducts.map((savings, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5 text-blue-600" />
                      {savings.name}
                    </CardTitle>
                    <CardDescription>{savings.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-gray-600 text-sm">Interest Rate</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 block mt-2 w-fit">{savings.rate}</Badge>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-gray-600 text-sm">Minimum Amount</span>
                        <span className="font-semibold text-gray-900 block mt-2">KSh {savings.minAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-gray-600 font-medium">Features:</span>
                      <ul className="space-y-2">
                        {savings.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
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
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insuranceProducts.map((insurance, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      {insurance.name}
                    </CardTitle>
                    <CardDescription>{insurance.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Premium:</span>
                        <div className="font-semibold text-purple-600 mt-1">{insurance.premium}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-gray-500 text-xs">Coverage:</span>
                        <div className="font-semibold text-green-600 mt-1">{insurance.coverage}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-gray-600 font-medium">Features:</span>
                      <ul className="space-y-2">
                        {insurance.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <MpesaServicePayment
                      serviceName={`${insurance.name} Premium`}
                      amount={insurance.name === 'Crop Insurance' ? 2000 : 2000}
                      description={`Premium payment for ${insurance.name}`}
                      onSuccess={handleInsurancePayment(insurance.name)}
                      buttonText="Pay Premium via M-Pesa"
                      buttonVariant="outline"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            {/* Financial Literacy Section */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <BookOpen className="h-6 w-6" />
                  Financial Literacy Resources
                </CardTitle>
                <CardDescription>Learn about managing farm finances effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <Target className="h-10 w-10 text-orange-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Budget Planning</h3>
                    <p className="text-sm text-gray-600 mb-4">Learn how to plan your farm budget for maximum profitability</p>
                    <Button variant="link" className="text-orange-600 p-0">
                      Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <DollarSign className="h-10 w-10 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Debt Management</h3>
                    <p className="text-sm text-gray-600 mb-4">Smart strategies for managing and repaying agricultural loans</p>
                    <Button variant="link" className="text-green-600 p-0">
                      Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <Percent className="h-10 w-10 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Investment Tips</h3>
                    <p className="text-sm text-gray-600 mb-4">How to invest your farm profits for long-term growth</p>
                    <Button variant="link" className="text-blue-600 p-0">
                      Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQs Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-gray-700" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Common questions about our financial services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                      <span className="text-green-600 font-bold">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 ml-5">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Success Stories / Testimonials */}
        <Card className="mb-12 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Award className="h-6 w-6" />
              Success Stories
            </CardTitle>
            <CardDescription>Hear from farmers who transformed their lives with our financial services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="h-8 w-8 text-green-200 absolute -top-2 -left-2" />
                      <p className="text-gray-700 italic pl-6">{testimonial.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 shadow-2xl border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 text-2xl">Why Choose FarmConnect Financial Services?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Smartphone className="h-10 w-10 text-green-700" />
                </div>
                <h3 className="font-bold text-green-800 mb-3 text-lg">M-Pesa Integration</h3>
                <p className="text-sm text-green-700 leading-relaxed">All transactions through your mobile phone. Fast, secure, and convenient payments anytime, anywhere.</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-10 w-10 text-blue-700" />
                </div>
                <h3 className="font-bold text-blue-800 mb-3 text-lg">Competitive Rates</h3>
                <p className="text-sm text-blue-700 leading-relaxed">Best interest rates for agricultural financing. Low processing fees and flexible repayment terms.</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-10 w-10 text-purple-700" />
                </div>
                <h3 className="font-bold text-purple-800 mb-3 text-lg">Quick Approval</h3>
                <p className="text-sm text-purple-700 leading-relaxed">Fast processing with minimal documentation. Get approved in 24-48 hours and start growing your farm.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialServices;
