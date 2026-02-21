
-- Fix RLS policies: change from RESTRICTIVE to PERMISSIVE

-- bills table
DROP POLICY IF EXISTS "Customers can view their own bills" ON public.bills;
DROP POLICY IF EXISTS "Owner can insert bills" ON public.bills;
DROP POLICY IF EXISTS "Owner can update bills" ON public.bills;
DROP POLICY IF EXISTS "Owner can view all bills" ON public.bills;

CREATE POLICY "Customers can view their own bills" ON public.bills FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Owner can insert bills" ON public.bills FOR INSERT WITH CHECK (has_role(auth.uid(), 'owner'::app_role));
CREATE POLICY "Owner can update bills" ON public.bills FOR UPDATE USING (has_role(auth.uid(), 'owner'::app_role));
CREATE POLICY "Owner can view all bills" ON public.bills FOR SELECT USING (has_role(auth.uid(), 'owner'::app_role));

-- customers table
DROP POLICY IF EXISTS "Customers can insert their own profile" ON public.customers;
DROP POLICY IF EXISTS "Customers can update their own profile" ON public.customers;
DROP POLICY IF EXISTS "Customers can view own profile" ON public.customers;
DROP POLICY IF EXISTS "Owner can view all customers" ON public.customers;

CREATE POLICY "Customers can insert their own profile" ON public.customers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Customers can update their own profile" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Customers can view own profile" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Owner can view all customers" ON public.customers FOR SELECT USING (has_role(auth.uid(), 'owner'::app_role));

-- reviews table
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Owner can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Owner can view all reviews" ON public.reviews;

CREATE POLICY "Anyone can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated users can submit reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owner can update reviews" ON public.reviews FOR UPDATE USING (has_role(auth.uid(), 'owner'::app_role));
CREATE POLICY "Owner can view all reviews" ON public.reviews FOR SELECT USING (has_role(auth.uid(), 'owner'::app_role));

-- user_roles table
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- visits table
DROP POLICY IF EXISTS "Customers can view their own visits" ON public.visits;
DROP POLICY IF EXISTS "Owner can insert visits" ON public.visits;
DROP POLICY IF EXISTS "Owner can view all visits" ON public.visits;

CREATE POLICY "Customers can view their own visits" ON public.visits FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Owner can insert visits" ON public.visits FOR INSERT WITH CHECK (has_role(auth.uid(), 'owner'::app_role));
CREATE POLICY "Owner can view all visits" ON public.visits FOR SELECT USING (has_role(auth.uid(), 'owner'::app_role));
