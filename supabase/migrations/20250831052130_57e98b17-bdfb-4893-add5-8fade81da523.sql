-- Fix security warning: Function Search Path Mutable
-- Update the function to set search_path parameter
CREATE OR REPLACE FUNCTION public.get_user_active_orders(check_user_id uuid)
RETURNS TABLE(farmer_id uuid, buyer_user_id uuid) 
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT o.farmer_id, b.user_id as buyer_user_id
  FROM public.orders o
  JOIN public.buyers b ON o.buyer_id = b.id
  WHERE o.status IN ('pending', 'confirmed', 'in_progress')
  AND (o.farmer_id = check_user_id OR b.user_id = check_user_id);
$$;