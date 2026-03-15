
CREATE POLICY "Owner can delete customers" ON public.customers
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owner can delete bills" ON public.bills
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'owner'));
