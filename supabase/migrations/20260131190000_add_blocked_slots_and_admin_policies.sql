-- Add blocked slots table for admin-controlled availability
CREATE TABLE public.blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  slot_type public.slot_type NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_blocked_date_slot UNIQUE (date, slot_type)
);

ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage blocked slots
CREATE POLICY "Authenticated can view blocked slots"
ON public.blocked_slots
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can create blocked slots"
ON public.blocked_slots
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can delete blocked slots"
ON public.blocked_slots
FOR DELETE
TO authenticated
USING (true);

-- Allow public to read blocked slots for availability checks
CREATE POLICY "Public can view blocked slots"
ON public.blocked_slots
FOR SELECT
TO anon
USING (true);

-- Allow authenticated users to delete bookings
CREATE POLICY "Authenticated can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (true);

-- Allow authenticated users to update booking status
CREATE POLICY "Authenticated can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
