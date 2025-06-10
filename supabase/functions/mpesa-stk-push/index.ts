
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface STKPushRequest {
  phone_number: string
  amount: number
  account_reference: string
  transaction_desc: string
}

async function getMpesaAccessToken() {
  const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY')
  const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET')
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('M-Pesa credentials not configured')
  }

  const credentials = btoa(`${consumerKey}:${consumerSecret}`)
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${credentials}`,
    },
  })

  const data = await response.json()
  return data.access_token
}

async function initiateSTKPush(accessToken: string, payload: STKPushRequest) {
  const businessShortCode = Deno.env.get('MPESA_BUSINESS_SHORTCODE') || '174379'
  const passkey = Deno.env.get('MPESA_PASSKEY')
  const callbackURL = `${Deno.env.get('SUPABASE_URL')}/functions/v1/mpesa-callback`
  
  if (!passkey) {
    throw new Error('M-Pesa passkey not configured')
  }

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
  const password = btoa(`${businessShortCode}${passkey}${timestamp}`)

  // Format phone number to 254XXXXXXXXX
  let phoneNumber = payload.phone_number.replace(/^\+/, '')
  if (phoneNumber.startsWith('0')) {
    phoneNumber = '254' + phoneNumber.slice(1)
  }
  if (!phoneNumber.startsWith('254')) {
    phoneNumber = '254' + phoneNumber
  }

  const stkPushPayload = {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: payload.amount,
    PartyA: phoneNumber,
    PartyB: businessShortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackURL,
    AccountReference: payload.account_reference,
    TransactionDesc: payload.transaction_desc
  }

  const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stkPushPayload),
  })

  return await response.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { phone_number, amount, account_reference, transaction_desc } = await req.json()

    if (!phone_number || !amount) {
      return new Response(
        JSON.stringify({ error: 'Phone number and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get M-Pesa access token
    const accessToken = await getMpesaAccessToken()

    // Initiate STK Push
    const stkResponse = await initiateSTKPush(accessToken, {
      phone_number,
      amount,
      account_reference: account_reference || 'FarmConnect',
      transaction_desc: transaction_desc || 'FarmConnect Payment'
    })

    console.log('STK Push Response:', stkResponse)

    // Store transaction in database
    if (stkResponse.CheckoutRequestID) {
      const { error } = await supabase
        .from('mpesa_transactions')
        .insert({
          transaction_id: stkResponse.CheckoutRequestID,
          phone_number,
          amount,
          status: 'pending',
          transaction_type: 'stk_push',
          reference: account_reference,
          description: transaction_desc
        })

      if (error) {
        console.error('Database error:', error)
      }
    }

    return new Response(
      JSON.stringify(stkResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('STK Push error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
