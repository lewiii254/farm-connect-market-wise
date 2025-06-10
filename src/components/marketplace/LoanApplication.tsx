
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Clock, Percent, Shield } from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { toast } from "@/hooks/use-toast";

interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  maxTerm: number;
  processingFee: number;
  requirements: string[];
}

interface LoanApplicationProps {
  loanProduct: LoanProduct;
  onClose?: () => void;
}

export const LoanApplication = ({ loanProduct, onClose }: LoanApplicationProps) => {
  const [applicationData, setApplicationData] = useState({
    amount: '',
    purpose: '',
    termMonths: '6',
    farmSize: '',
    monthlyIncome: '',
    phoneNumber: '',
    cropType: '',
    experience: '',
    collateral: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loanAmount = Number(applicationData.amount) || 0;
  const monthlyPayment = loanAmount > 0 ? 
    (loanAmount * (1 + loanProduct.interestRate / 100) / Number(applicationData.termMonths)) : 0;

  const handleSuccessfulPayment = (transactionId: string) => {
    setIsSubmitting(true);
    
    // Simulate loan application processing
    setTimeout(() => {
      toast({
        title: "Loan Application Submitted!",
        description: `Your application for KSh ${loanAmount.toLocaleString()} has been submitted. Reference: ${transactionId}`,
      });
      setIsSubmitting(false);
      onClose?.();
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: `Unable to process application fee: ${error}`,
      variant: "destructive"
    });
  };

  const isFormValid = () => {
    return (
      applicationData.amount &&
      applicationData.purpose &&
      applicationData.farmSize &&
      applicationData.monthlyIncome &&
      applicationData.phoneNumber &&
      loanAmount >= loanProduct.minAmount &&
      loanAmount <= loanProduct.maxAmount
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Loan Product Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            {loanProduct.name} Application
          </CardTitle>
          <CardDescription>{loanProduct.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {loanProduct.interestRate}%
              </div>
              <div className="text-sm text-gray-500">Interest Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {loanProduct.maxTerm}
              </div>
              <div className="text-sm text-gray-500">Max Months</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                KSh {loanProduct.minAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Min Amount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                KSh {loanProduct.maxAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Max Amount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Application Details</CardTitle>
          <CardDescription>
            Complete all fields to submit your loan application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Loan Amount (KSh) *</Label>
              <Input
                id="amount"
                type="number"
                min={loanProduct.minAmount}
                max={loanProduct.maxAmount}
                value={applicationData.amount}
                onChange={(e) => setApplicationData({...applicationData, amount: e.target.value})}
                placeholder={`${loanProduct.minAmount} - ${loanProduct.maxAmount}`}
              />
              {loanAmount > 0 && (
                <div className="text-sm text-gray-500 mt-1">
                  Monthly payment: KSh {monthlyPayment.toLocaleString()} for {applicationData.termMonths} months
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="termMonths">Loan Term (Months) *</Label>
              <Select value={applicationData.termMonths} onValueChange={(value) => 
                setApplicationData({...applicationData, termMonths: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="9">9 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="purpose">Loan Purpose *</Label>
              <Input
                id="purpose"
                value={applicationData.purpose}
                onChange={(e) => setApplicationData({...applicationData, purpose: e.target.value})}
                placeholder="e.g., Seeds and fertilizer for maize farming"
              />
            </div>

            <div>
              <Label htmlFor="cropType">Primary Crop Type</Label>
              <Input
                id="cropType"
                value={applicationData.cropType}
                onChange={(e) => setApplicationData({...applicationData, cropType: e.target.value})}
                placeholder="e.g., Maize, Beans, Potatoes"
              />
            </div>

            <div>
              <Label htmlFor="farmSize">Farm Size (Acres) *</Label>
              <Input
                id="farmSize"
                type="number"
                value={applicationData.farmSize}
                onChange={(e) => setApplicationData({...applicationData, farmSize: e.target.value})}
                placeholder="5"
              />
            </div>

            <div>
              <Label htmlFor="monthlyIncome">Monthly Income (KSh) *</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={applicationData.monthlyIncome}
                onChange={(e) => setApplicationData({...applicationData, monthlyIncome: e.target.value})}
                placeholder="25000"
              />
            </div>

            <div>
              <Label htmlFor="experience">Farming Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                value={applicationData.experience}
                onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                placeholder="5"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">M-Pesa Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={applicationData.phoneNumber}
                onChange={(e) => setApplicationData({...applicationData, phoneNumber: e.target.value})}
                placeholder="254712345678"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="collateral">Collateral/Assets (Optional)</Label>
            <Textarea
              id="collateral"
              value={applicationData.collateral}
              onChange={(e) => setApplicationData({...applicationData, collateral: e.target.value})}
              placeholder="Describe any assets you can offer as collateral..."
              rows={3}
            />
          </div>

          {/* Requirements Checklist */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Loan Requirements:</h4>
            <ul className="space-y-1">
              {loanProduct.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Section */}
          {isFormValid() && (
            <div className="border-t pt-4">
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Application Summary:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Loan Amount: <span className="font-semibold">KSh {loanAmount.toLocaleString()}</span></div>
                  <div>Processing Fee: <span className="font-semibold">KSh {loanProduct.processingFee}</span></div>
                  <div>Term: <span className="font-semibold">{applicationData.termMonths} months</span></div>
                  <div>Monthly Payment: <span className="font-semibold">KSh {monthlyPayment.toLocaleString()}</span></div>
                </div>
              </div>

              <MpesaServicePayment
                serviceName="Loan Application Processing"
                amount={loanProduct.processingFee}
                description={`Processing fee for ${loanProduct.name} - KSh ${loanAmount.toLocaleString()}`}
                onSuccess={handleSuccessfulPayment}
                onError={handlePaymentError}
                buttonText={`Pay Processing Fee - KSh ${loanProduct.processingFee}`}
              />

              <div className="text-xs text-gray-500 text-center mt-2">
                <Shield className="h-3 w-3 inline mr-1" />
                Secure payment processing • 24-48 hour approval process
              </div>
            </div>
          )}

          {!isFormValid() && (
            <div className="text-center text-gray-500 p-4">
              Please complete all required fields to proceed with payment
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
