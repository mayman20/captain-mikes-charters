-- Create enum for slot types
CREATE TYPE public.slot_type AS ENUM ('AM', 'PM', 'FULL');

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'canceled');

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  slot_type slot_type NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size >= 1 AND party_size <= 6),
  notes TEXT,
  status booking_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Unique constraint to prevent double booking same slot on same date
  CONSTRAINT unique_date_slot UNIQUE (date, slot_type)
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings (customers don't need to be logged in)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Allow public to read bookings (for availability checking)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Create a function to check if a slot is available
CREATE OR REPLACE FUNCTION public.is_slot_available(check_date DATE, check_slot slot_type)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  has_full BOOLEAN;
  has_am BOOLEAN;
  has_pm BOOLEAN;
BEGIN
  -- Check for confirmed bookings on this date
  SELECT 
    EXISTS(SELECT 1 FROM bookings WHERE date = check_date AND slot_type = 'FULL' AND status = 'confirmed'),
    EXISTS(SELECT 1 FROM bookings WHERE date = check_date AND slot_type = 'AM' AND status = 'confirmed'),
    EXISTS(SELECT 1 FROM bookings WHERE date = check_date AND slot_type = 'PM' AND status = 'confirmed')
  INTO has_full, has_am, has_pm;
  
  -- If full day is booked, nothing is available
  IF has_full THEN
    RETURN FALSE;
  END IF;
  
  -- Check specific slot
  IF check_slot = 'FULL' THEN
    -- Full day only available if neither AM nor PM is booked
    RETURN NOT (has_am OR has_pm);
  ELSIF check_slot = 'AM' THEN
    RETURN NOT has_am;
  ELSIF check_slot = 'PM' THEN
    RETURN NOT has_pm;
  END IF;
  
  RETURN FALSE;
END;
$$;

-- Create a trigger to enforce availability before insert
CREATE OR REPLACE FUNCTION public.check_booking_availability()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_slot_available(NEW.date, NEW.slot_type) THEN
    RAISE EXCEPTION 'This time slot is no longer available';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_booking_availability
BEFORE INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION check_booking_availability();

-- Create admin users table for simple admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- No public access to admin_users table (admin auth will be handled via edge function)