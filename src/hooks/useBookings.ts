import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Booking {
  id: string;
  flight_id: string;
  user_id: string;
  passenger_count: number;
  total_price: number;
  booking_status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  passenger_details: any;
  payment_details: any;
  payment_method_id: string | null;
  created_at: string;
  updated_at: string;
  flights: {
    id: string;
    departure_airport: string;
    arrival_airport: string;
    departure_time: string;
    arrival_time: string;
    flight_duration: string;
    operator: string;
    jet_id: number;
    img_destination: string | null;
    jets: {
      brand: string;
      model: string;
      type: string;
      image_url: string | null;
    } | null;
  } | null;
}

export const useBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          flight_id,
          user_id,
          passenger_count,
          total_price,
          booking_status,
          passenger_details,
          payment_details,
          payment_method_id,
          created_at,
          updated_at,
          flights!bookings_flight_id_fkey (
            id,
            departure_airport,
            arrival_airport,
            departure_time,
            arrival_time,
            flight_duration,
            operator,
            jet_id,
            img_destination,
            jets!flights_jet_id_fkey (
              brand,
              model,
              type,
              image_url
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} bookings for user`);
      return data as Booking[];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Refresh when user comes back
  });
};
