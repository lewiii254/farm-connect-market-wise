import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CreditCard, 
  Shield, 
  Zap, 
  CheckCircle,
  AlertCircle,
  Phone,
  Loader2
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface MpesaPaymentProps {
  amount: number;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
  description?: string;
  accountReference?: string;
}

interface MpesaTransactionData {
  id: string;
  transaction_id: string;
  phone_number: string;
  amount: number;
  status: string;
  mpesa_receipt_number?: string;
  transaction_date?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  reference?: string;
  description?: string;
  transaction_type?: string;
}

export const MpesaPayment = ({ 
  amount, 
  onSuccess, 
  onError, 
  description = "FarmConnect Payment",
  accountReference = "FarmConnect"
}: MpesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const initiatePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa phone number",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phone_number: phoneNumber,
          amount: amount,
          account_reference: accountReference,
          transaction_desc: description
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.ResponseCode === '0') {
        const checkoutRequestID = data.CheckoutRequestID;
        setTransactionId(checkoutRequestID);
        
        toast({
          title: "Payment Initiated",
          description: "Please check your phone and enter your M-Pesa PIN",
        });

        // Poll for transaction status
        pollTransactionStatus(checkoutRequestID);
      } else {
        throw new Error(data.ResponseDescription || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error.message || "Payment failed. Please try again.";
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive"
      });
      onError?.(errorMessage);
      setIsProcessing(false);
    }
  };

  const pollTransactionStatus = async (checkoutRequestID: string) => {
    const maxAttempts = 30; // Poll for 5 minutes (30 * 10 seconds)
    let attempts = 0;

    const poll = async () => {
      try {
        // Try to get transaction data from database directly
        const { data: transactionData, error: dbError } = await supabase
          .from('mpesa_transactions')
          .select('*')
          .eq('transaction_id', checkoutRequestID)
          .single();

        if (dbError || !transactionData) {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000);
          } else {
            setIsProcessing(false);
            toast({
              title: "Payment Timeout",
              description: "Payment verification timed out. Please check your transaction history.",
              variant: "destructive"
            });
          }
          return;
        }

        const transaction = transactionData as MpesaTransactionData;

        if (transaction.status === 'completed') {
          setIsProcessing(false);
          toast({
            title: "Payment Successful!",
            description: `Transaction ID: ${transaction.mpesa_receipt_number || checkoutRequestID}`,
          });
          onSuccess?.(transaction.mpesa_receipt_number || checkoutRequestID);
        } else if (transaction.status === 'failed') {
          setIsProcessing(false);
          toast({
            title: "Payment Failed",
            description: "The payment was not completed. Please try again.",
            variant: "destructive"
          });
          onError?.("Payment failed");
        } else {
          // Still pending, continue polling
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000);
          } else {
            setIsProcessing(false);
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
        } else {
          setIsProcessing(false);
        }
      }
    };

    setTimeout(poll, 5000); // Start polling after 5 seconds
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Smartphone className="h-5 w-5" />
          M-Pesa Payment
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">KSh {amount.toLocaleString()}</div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">M-Pesa Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10"
              disabled={isProcessing}
            />
          </div>
        </div>

        <Button 
          onClick={initiatePayment} 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {transactionId ? 'Waiting for confirmation...' : 'Processing...'}
            </>
          ) : (
            <>
              <Smartphone className="h-4 w-4 mr-2" />
              Pay with M-Pesa
            </>
          )}
        </Button>

        {isProcessing && transactionId && (
          <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Check your phone for M-Pesa prompt
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Shield className="h-3 w-3" />
          Secured by Safaricom M-Pesa
        </div>
      </CardContent>
    </Card>
  );
};

export const SafaricomServices = () => {
  const services = [
    {
      name: "M-Pesa",
      description: "Mobile money transfer and payments",
      icon: Smartphone,
      color: "green",
      features: ["Send Money", "Pay Bills", "Buy Airtime", "Merchant Payments"]
    },
    {
      name: "M-Shwari",
      description: "Mobile banking and savings",
      icon: CreditCard,
      color: "blue",
      features: ["Save Money", "Get Loans", "Fixed Deposits", "Account Management"]
    },
    {
      name: "Fuliza",
      description: "M-Pesa overdraft service",
      icon: Zap,
      color: "orange",
      features: ["Complete Transactions", "Pay Later", "No Collateral", "Instant Access"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 text-${service.color}-700`}>
              <service.icon className="h-5 w-5" />
              {service.name}
            </CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className={`w-full mt-4 border-${service.color}-200 text-${service.color}-700 hover:bg-${service.color}-50`}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const MpesaStatus = ({ transactionId }: { transactionId: string }) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Payment Successful</p>
            <p className="text-sm text-green-600">Transaction: {transactionId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
