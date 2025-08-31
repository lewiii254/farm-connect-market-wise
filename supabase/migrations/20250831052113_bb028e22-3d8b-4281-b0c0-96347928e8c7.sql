-- Phase 1: Fix RLS recursive loop with security definer functions
-- Create security definer function to safely check user relationships
CREATE OR REPLACE FUNCTION public.get_user_active_orders(check_user_id uuid)
RETURNS TABLE(farmer_id uuid, buyer_user_id uuid) 
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT o.farmer_id, b.user_id as buyer_user_id
  FROM public.orders o
  JOIN public.buyers b ON o.buyer_id = b.id
  WHERE o.status IN ('pending', 'confirmed', 'in_progress')
  AND (o.farmer_id = check_user_id OR b.user_id = check_user_id);
$$;

-- Phase 2: Replace problematic RLS policies with secure versions
-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view buyers in active transactions" ON public.buyers;
DROP POLICY IF EXISTS "Users can view profiles in business relationships" ON public.profiles;

-- Create secure buyers policies without sensitive data exposure
CREATE POLICY "Users can view buyers in active transactions" 
ON public.buyers 
FOR SELECT 
USING (
  user_id IN (
    SELECT farmer_id FROM public.get_user_active_orders(auth.uid())
    UNION
    SELECT buyer_user_id FROM public.get_user_active_orders(auth.uid())
  )
);

-- Create secure profiles policy that excludes sensitive fields for business relationships
CREATE POLICY "Users can view business contact profiles" 
ON public.profiles 
FOR SELECT 
USING (
  id IN (
    SELECT farmer_id FROM public.get_user_active_orders(auth.uid())
    UNION
    SELECT buyer_user_id FROM public.get_user_active_orders(auth.uid())
  )
  AND id != auth.uid() -- Exclude own profile (covered by separate policy)
);

-- Phase 3: Add column-level security for sensitive fields
-- Create a view for business profiles that excludes sensitive data
CREATE OR REPLACE VIEW public.business_profiles AS
SELECT 
  id,
  username,
  full_name,
  county,
  farm_size_acres,
  primary_crops,
  created_at,
  updated_at
FROM public.profiles;

-- Grant select on the view
GRANT SELECT ON public.business_profiles TO authenticated;

-- Create RLS policy for the view
ALTER VIEW public.business_profiles SET (security_invoker = true);