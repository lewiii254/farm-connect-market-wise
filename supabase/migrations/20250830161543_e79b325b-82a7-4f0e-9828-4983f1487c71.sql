-- Fix security vulnerability: Restrict buyers table access to authenticated users only
-- This prevents competitors from harvesting business contact information

-- Drop the overly permissive policy that allows anyone to view all buyers
DROP POLICY IF EXISTS "Users can view all buyers" ON public.buyers;

-- Create a more secure policy that requires authentication
-- Only authenticated users can view buyer profiles, which is appropriate for a B2B marketplace
CREATE POLICY "Authenticated users can view buyers" 
ON public.buyers 
FOR SELECT 
TO authenticated
USING (true);

-- Optional: Add a more restrictive policy that could be enabled later
-- This would only show buyers to farmers who have crops they might want to buy
-- Uncomment and modify as needed:
-- CREATE POLICY "Farmers can view relevant buyers" 
-- ON public.buyers 
-- FOR SELECT 
-- TO authenticated
-- USING (
--   EXISTS (
--     SELECT 1 FROM crop_listings 
--     WHERE farmer_id = auth.uid() 
--     AND crop_name = ANY(preferred_crops)
--   )
-- );