-- Create role enum
CREATE TYPE public.app_role AS ENUM ('owner', 'customer');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create customers table (profiles for signed-in customers)
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create visits table for tracking customer visits
CREATE TABLE public.visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    service_details TEXT,
    visit_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on visits
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

-- Create bills table
CREATE TABLE public.bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    bill_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bills
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Create reviews table for testimonials
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policies for customers
CREATE POLICY "Owner can view all customers"
ON public.customers FOR SELECT
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Customers can view own profile"
ON public.customers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Customers can insert their own profile"
ON public.customers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers can update their own profile"
ON public.customers FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for visits
CREATE POLICY "Owner can view all visits"
ON public.visits FOR SELECT
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owner can insert visits"
ON public.visits FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Customers can view their own visits"
ON public.visits FOR SELECT
USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- RLS Policies for bills
CREATE POLICY "Owner can view all bills"
ON public.bills FOR SELECT
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owner can insert bills"
ON public.bills FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owner can update bills"
ON public.bills FOR UPDATE
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Customers can view their own bills"
ON public.bills FOR SELECT
USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- RLS Policies for reviews
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT
USING (is_approved = true);

CREATE POLICY "Owner can view all reviews"
ON public.reviews FOR SELECT
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owner can update reviews"
ON public.reviews FOR UPDATE
USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Authenticated users can submit reviews"
ON public.reviews FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for customers
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();