
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MpesaTransaction {
  id: string;
  transaction_id: string;
  phone_number: string;
  amount: number;
  status: string;
  mpesa_receipt_number?: string;
  created_at: string;
}

export const useMpesa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<MpesaTransaction[]>([]);

  const initiatePayment = async (phoneNumber: string, amount: number, description: string = "FarmConnect Payment") => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phone_number: phoneNumber,
          amount: amount,
          account_reference: 'FarmConnect',
          transaction_desc: description
        }
      });

      if (error) throw error;

      if (data.ResponseCode === '0') {
        toast({
          title: "Payment Initiated",
          description: "Please check your phone and enter your M-Pesa PIN",
        });
        return data.CheckoutRequestID;
      } else {
        throw new Error(data.ResponseDescription || 'Failed to initiate payment');
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkTransactionStatus = async (transactionId: string) => {
    try {
      const { data, error } = await supabase
        .from('mpesa_transactions')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking transaction status:', error);
      throw error;
    }
  };

  const getUserTransactions = async (userId?: string) => {
    try {
      let query = supabase
        .from('mpesa_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };

  return {
    isLoading,
    transactions,
    initiatePayment,
    checkTransactionStatus,
    getUserTransactions
  };
};
