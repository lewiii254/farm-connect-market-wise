
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Sample crop listings data
    const sampleCrops = [
      {
        crop_name: 'Maize',
        quantity_kg: 500,
        price_per_kg: 45,
        location: 'Nakuru',
        farmer_id: '00000000-0000-0000-0000-000000000001',
        harvest_date: '2024-01-15',
        available_from: '2024-01-20',
        available_until: '2024-03-20',
        description: 'High quality white maize, freshly harvested and properly dried. Perfect for both human consumption and animal feed.',
        is_organic: false,
        is_available: true
      },
      {
        crop_name: 'Tomatoes',
        quantity_kg: 200,
        price_per_kg: 80,
        location: 'Kiambu',
        farmer_id: '00000000-0000-0000-0000-000000000002',
        harvest_date: '2024-01-10',
        available_from: '2024-01-12',
        available_until: '2024-01-25',
        description: 'Fresh, red tomatoes perfect for cooking and salads. Grown using sustainable farming practices.',
        is_organic: true,
        is_available: true
      },
      {
        crop_name: 'Potatoes',
        quantity_kg: 800,
        price_per_kg: 35,
        location: 'Meru',
        farmer_id: '00000000-0000-0000-0000-000000000003',
        harvest_date: '2024-01-05',
        available_from: '2024-01-08',
        available_until: '2024-02-08',
        description: 'High-grade Irish potatoes, well-stored and ready for market. Great for both wholesale and retail.',
        is_organic: false,
        is_available: true
      },
      {
        crop_name: 'Beans',
        quantity_kg: 300,
        price_per_kg: 120,
        location: 'Embu',
        farmer_id: '00000000-0000-0000-0000-000000000004',
        harvest_date: '2024-01-12',
        available_from: '2024-01-15',
        available_until: '2024-04-15',
        description: 'Premium red kidney beans, properly dried and sorted. Rich in protein and perfect for local and export markets.',
        is_organic: true,
        is_available: true
      },
      {
        crop_name: 'Kales (Sukuma Wiki)',
        quantity_kg: 50,
        price_per_kg: 25,
        location: 'Kiambu',
        farmer_id: '00000000-0000-0000-0000-000000000005',
        harvest_date: '2024-01-18',
        available_from: '2024-01-18',
        available_until: '2024-01-22',
        description: 'Fresh kales harvested this morning. Perfect for traditional Kenyan dishes. Available in bulk quantities.',
        is_organic: false,
        is_available: true
      },
      {
        crop_name: 'Avocados',
        quantity_kg: 150,
        price_per_kg: 200,
        location: 'Murang\'a',
        farmer_id: '00000000-0000-0000-0000-000000000006',
        harvest_date: '2024-01-14',
        available_from: '2024-01-16',
        available_until: '2024-01-30',
        description: 'Premium Hass avocados, perfectly ripe and ready for consumption. Export quality with proper grading.',
        is_organic: true,
        is_available: true
      },
      {
        crop_name: 'Bananas',
        quantity_kg: 400,
        price_per_kg: 40,
        location: 'Meru',
        farmer_id: '00000000-0000-0000-0000-000000000007',
        harvest_date: '2024-01-16',
        available_from: '2024-01-17',
        available_until: '2024-01-24',
        description: 'Sweet bananas, perfect ripeness for immediate consumption or retail. Grown in rich volcanic soil.',
        is_organic: false,
        is_available: true
      },
      {
        crop_name: 'Carrots',
        quantity_kg: 250,
        price_per_kg: 60,
        location: 'Nyandarua',
        farmer_id: '00000000-0000-0000-0000-000000000008',
        harvest_date: '2024-01-13',
        available_from: '2024-01-15',
        available_until: '2024-02-15',
        description: 'Orange carrots with excellent sweetness and crunch. Ideal for fresh consumption, juicing, or cooking.',
        is_organic: true,
        is_available: true
      },
      {
        crop_name: 'Onions',
        quantity_kg: 600,
        price_per_kg: 50,
        location: 'Nakuru',
        farmer_id: '00000000-0000-0000-0000-000000000009',
        harvest_date: '2024-01-08',
        available_from: '2024-01-12',
        available_until: '2024-03-12',
        description: 'Red onions with long shelf life. Properly cured and stored. Perfect for both local and regional markets.',
        is_organic: false,
        is_available: true
      },
      {
        crop_name: 'Cabbage',
        quantity_kg: 180,
        price_per_kg: 30,
        location: 'Kiambu',
        farmer_id: '00000000-0000-0000-0000-000000000010',
        harvest_date: '2024-01-17',
        available_from: '2024-01-18',
        available_until: '2024-01-28',
        description: 'Fresh cabbages with tight heads and crisp leaves. Perfect for salads, cooking, or coleslaw preparation.',
        is_organic: false,
        is_available: true
      }
    ]

    // Insert sample crops
    const { data, error } = await supabase
      .from('crop_listings')
      .insert(sampleCrops)
      .select()

    if (error) {
      console.error('Error inserting sample crops:', error)
      throw error
    }

    console.log(`Successfully inserted ${data.length} sample crop listings`)

    return new Response(
      JSON.stringify({ 
        message: `Successfully seeded ${data.length} crop listings`,
        crops: data 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Seed crops error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
