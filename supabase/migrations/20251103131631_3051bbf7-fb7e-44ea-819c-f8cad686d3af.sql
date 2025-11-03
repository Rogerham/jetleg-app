-- Add payment_method_id to bookings table to reference payment methods securely
ALTER TABLE public.bookings 
ADD COLUMN payment_method_id uuid REFERENCES public.payment_methods(id);

-- Add comment to clarify that payment_details should not contain sensitive card data
COMMENT ON COLUMN public.bookings.payment_details IS 'Non-sensitive payment metadata only (billing address, payment status). Sensitive card data is stored via payment_method_id reference.';

-- Create index for better query performance
CREATE INDEX idx_bookings_payment_method_id ON public.bookings(payment_method_id);