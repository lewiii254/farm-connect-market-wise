
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Smartphone, 
  CreditCard, 
  Shield, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useMpesa } from '@/hooks/useMpesa';
import { 
  isValidMpesaPhone, 
  formatPhoneInput, 
  getPhoneValidationError, 
  formatMpesaPhone 
} from '@/utils/phoneValidation';

interface MpesaServicePaymentProps {
  serviceName: string;
  amount: number;
  description: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const MpesaServicePayment = ({ 
  serviceName,
  amount, 
  description,
  onSuccess, 
  onError,
  buttonText = "Pay with M-Pesa",
  buttonVariant = "default"
}: MpesaServicePaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, initiatePayment, checkTransactionStatus } = useMpesa();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handlePayment = async () => {
    // Validate phone number for M-Pesa
    const phoneError = getPhoneValidationError(phoneNumber, true);
    if (phoneError) {
      toast({
        title: "Invalid Phone Number",
        description: phoneError,
        variant: "destructive"
      });
      return;
    }

    try {
      const checkoutRequestID = await initiatePayment(formatMpesaPhone(phoneNumber) || phoneNumber, amount, description);
      setTransactionId(checkoutRequestID);
      
      // Poll for transaction status
      pollTransactionStatus(checkoutRequestID);
    } catch (error) {
      onError?.(error.message);
    }
  };

  const pollTransactionStatus = async (checkoutRequestID: string) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      try {
        const transaction = await checkTransactionStatus(checkoutRequestID);
        
        if (transaction.status === 'completed') {
          toast({
            title: "Payment Successful!",
            description: `${serviceName} payment completed successfully`,
          });
          onSuccess?.(transaction.mpesa_receipt_number || checkoutRequestID);
          setIsOpen(false);
          setPhoneNumber('');
          setTransactionId(null);
        } else if (transaction.status === 'failed') {
          toast({
            title: "Payment Failed",
            description: `${serviceName} payment was not completed. Please try again.`,
            variant: "destructive"
          });
          onError?.("Payment failed");
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000);
          } else {
            toast({
              title: "Payment Timeout",
              description: "Payment verification timed out. Please check your transaction history.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        }
      }
    };

    setTimeout(poll, 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="w-full">
          <Smartphone className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            {serviceName} - M-Pesa Payment
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">KSh {amount.toLocaleString()}</div>
            <div className="text-sm text-green-600">{serviceName}</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+254 7XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => {
                  const formatted = formatPhoneInput(e.target.value, phoneNumber);
                  setPhoneNumber(formatted);
                }}
                className={`pl-10 ${!isValidMpesaPhone(phoneNumber) && phoneNumber ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
            </div>
            {phoneNumber && !isValidMpesaPhone(phoneNumber) && (
              <p className="text-sm text-red-600">
                Please enter a valid M-Pesa phone number
              </p>
            )}
          </div>

          <Button 
            onClick={handlePayment} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {transactionId ? 'Waiting for confirmation...' : 'Processing...'}
              </>
            ) : (
              <>
                <Smartphone className="h-4 w-4 mr-2" />
                Pay KSh {amount.toLocaleString()}
              </>
            )}
          </Button>

          {isLoading && transactionId && (
            <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              Check your phone for M-Pesa prompt
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            Secured by Safaricom M-Pesa
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LoanApplicationForm = ({ loanProduct }: { loanProduct: any }) => {
  const [applicationData, setApplicationData] = useState({
    amount: '',
    purpose: '',
    farmSize: '',
    monthlyIncome: '',
    phoneNumber: ''
  });

  const handleLoanPayment = () => {
    toast({
      title: "Loan Application Submitted!",
      description: "Your loan application has been submitted for review. You'll receive feedback within 24 hours.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for {loanProduct.name}</CardTitle>
        <CardDescription>Complete your loan application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Loan Amount (KSh)</Label>
            <Input 
              id="amount" 
              value={applicationData.amount}
              onChange={(e) => setApplicationData({...applicationData, amount: e.target.value})}
              placeholder="50000"
            />
          </div>
          <div>
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Input 
              id="purpose" 
              value={applicationData.purpose}
              onChange={(e) => setApplicationData({...applicationData, purpose: e.target.value})}
              placeholder="Seeds and fertilizer"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="farmSize">Farm Size (Acres)</Label>
            <Input 
              id="farmSize" 
              value={applicationData.farmSize}
              onChange={(e) => setApplicationData({...applicationData, farmSize: e.target.value})}
              placeholder="5"
            />
          </div>
          <div>
            <Label htmlFor="monthlyIncome">Monthly Income (KSh)</Label>
            <Input 
              id="monthlyIncome" 
              value={applicationData.monthlyIncome}
              onChange={(e) => setApplicationData({...applicationData, monthlyIncome: e.target.value})}
              placeholder="25000"
            />
          </div>
        </div>

        <MpesaServicePayment
          serviceName="Loan Application Fee"
          amount={500}
          description="One-time loan processing fee"
          onSuccess={handleLoanPayment}
          buttonText="Pay Application Fee & Submit"
        />
      </CardContent>
    </Card>
  );
};
