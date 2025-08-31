-- Phase 1: Fix buyers table RLS policies
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view buyers" ON public.buyers;

-- Create more restrictive policies
CREATE POLICY "Buyers can view their own profile" 
ON public.buyers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view buyers in active transactions" 
ON public.buyers 
FOR SELECT 
USING (
  auth.uid() IN (
    SELECT farmer_id FROM public.orders 
    WHERE buyer_id IN (
      SELECT id FROM public.buyers WHERE user_id = buyers.user_id
    )
    AND status IN ('pending', 'confirmed', 'in_progress')
  )
);

-- Phase 2: Fix profiles table RLS policies
-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new policies allowing business interactions
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can view profiles in business relationships" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IN (
    -- Can view farmer profiles if they have orders with them
    SELECT buyer_id FROM public.orders WHERE farmer_id = profiles.id
    UNION
    -- Can view buyer profiles if they are the farmer in orders
    SELECT farmer_id FROM public.orders 
    WHERE buyer_id IN (
      SELECT id FROM public.buyers WHERE user_id = profiles.id
    )
  )
);

-- Phase 3: Secure the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$function$;