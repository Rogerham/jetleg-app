-- Create function to refresh demo flights to be within 1-30 days from now
CREATE OR REPLACE FUNCTION public.refresh_demo_flights()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count integer;
BEGIN
  -- Update flights that are outside the 1-30 day window and not booked
  WITH flights_to_update AS (
    SELECT 
      f.id,
      f.departure_time,
      f.arrival_time,
      -- Calculate flight duration to preserve it
      f.arrival_time - f.departure_time AS flight_duration,
      -- Generate a stable day offset (1-30) based on flight id hash
      1 + (abs(('x' || substr(md5(f.id::text), 1, 8))::bit(32)::int) % 30) AS day_offset
    FROM flights f
    WHERE 
      -- Flight is outside the desired window
      (f.departure_time < now() + interval '1 day' OR f.departure_time > now() + interval '30 days')
      -- Flight is not booked
      AND NOT EXISTS (
        SELECT 1 FROM bookings b WHERE b.flight_id = f.id
      )
  )
  UPDATE flights f
  SET 
    -- Set departure to today + day_offset days, keeping the original time of day
    departure_time = date_trunc('day', now()) + ftu.day_offset * interval '1 day' 
                     + (ftu.departure_time - date_trunc('day', ftu.departure_time)),
    -- Set arrival based on new departure + original duration
    arrival_time = date_trunc('day', now()) + ftu.day_offset * interval '1 day' 
                   + (ftu.departure_time - date_trunc('day', ftu.departure_time))
                   + ftu.flight_duration
  FROM flights_to_update ftu
  WHERE f.id = ftu.id;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  RETURN updated_count;
END;
$$;

-- Grant execute permission to service role only
REVOKE ALL ON FUNCTION public.refresh_demo_flights() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.refresh_demo_flights() TO service_role;