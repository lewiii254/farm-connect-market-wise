
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const callbackData = await req.json()
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2))

    const stkCallback = callbackData.Body?.stkCallback
    
    if (!stkCallback) {
      return new Response('Invalid callback data', { status: 400 })
    }

    const checkoutRequestID = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc

    let mpesaReceiptNumber = null
    let transactionDate = null
    let phoneNumber = null
    let amount = null

    // Extract callback metadata if payment was successful
    if (resultCode === 0 && stkCallback.CallbackMetadata?.Item) {
      const metadata = stkCallback.CallbackMetadata.Item
      
      for (const item of metadata) {
        switch (item.Name) {
          case 'MpesaReceiptNumber':
            mpesaReceiptNumber = item.Value
            break
          case 'TransactionDate':
            transactionDate = item.Value
            break
          case 'PhoneNumber':
            phoneNumber = item.Value
            break
          case 'Amount':
            amount = item.Value
            break
        }
      }
    }

    // Update transaction status in database
    const updateData: any = {
      status: resultCode === 0 ? 'completed' : 'failed',
      updated_at: new Date().toISOString()
    }

    if (mpesaReceiptNumber) updateData.mpesa_receipt_number = mpesaReceiptNumber
    if (transactionDate) updateData.transaction_date = transactionDate
    if (phoneNumber) updateData.phone_number = phoneNumber
    if (amount) updateData.amount = amount

    const { error } = await supabase
      .from('mpesa_transactions')
      .update(updateData)
      .eq('transaction_id', checkoutRequestID)

    if (error) {
      console.error('Database update error:', error)
      return new Response('Database error', { status: 500 })
    }

    console.log(`Transaction ${checkoutRequestID} updated: ${resultCode === 0 ? 'SUCCESS' : 'FAILED'}`)

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Callback processing error:', error)
    return new Response('Internal server error', { status: 500 })
  }
})
