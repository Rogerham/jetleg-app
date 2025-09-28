import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { deduplicateFlightsByRoute } from '@/utils/flightUtils';

export interface Flight {
  id: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  price_per_seat: number;
  available_seats: number;
  operator: string;
  flight_duration: string;
  jet_id: number;
  img_destination?: string; // Add the missing property
  jets: {
    brand: string;
    model: string;
    type: string;
    seating_capacity: number;
    range_km: number;
    description: string;
    image_url: string | null;
  } | null;
}

export const useFlights = (searchParams?: {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
}) => {
  return useQuery({
    queryKey: ['flights', searchParams],
    queryFn: async () => {
      let query = supabase
        .from('flights')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          img_destination,
          jets!flights_jet_id_fkey (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `);

      // Apply filters if search params are provided
      // Handle "Alle luchthavens" - don't filter by departure if this is selected
      if (searchParams?.from && searchParams.from.trim() !== '' && searchParams.from !== 'Alle luchthavens') {
        const fromCity = searchParams.from.split('(')[0].trim();
        query = query.ilike('departure_airport', `%${fromCity}%`);
      }
      
      // Handle "Overal" destination - don't filter by destination
      if (searchParams?.to && searchParams.to !== 'Overal' && searchParams.to.trim() !== '') {
        const toCity = searchParams.to.split('(')[0].trim();
        query = query.ilike('arrival_airport', `%${toCity}%`);
      }

      // Handle flexible date options - treat 'fully-flexible' same as 'flexible'
      if (searchParams?.date && searchParams.date !== 'flexible' && searchParams.date !== 'fully-flexible') {
        if (!['today', 'tomorrow', 'weekend', 'next-week', 'next-month'].includes(searchParams.date)) {
          // Specific date selected
          const searchDate = new Date(searchParams.date);
          const nextDay = new Date(searchDate);
          nextDay.setDate(nextDay.getDate() + 1);
          
          query = query
            .gte('departure_time', searchDate.toISOString())
            .lt('departure_time', nextDay.toISOString());
        } else {
          // Handle flexible date options
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          switch (searchParams.date) {
            case 'today':
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);
              query = query
                .gte('departure_time', today.toISOString())
                .lt('departure_time', tomorrow.toISOString());
              break;
              
            case 'tomorrow':
              const tomorrowStart = new Date(today);
              tomorrowStart.setDate(tomorrowStart.getDate() + 1);
              const tomorrowEnd = new Date(tomorrowStart);
              tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
              query = query
                .gte('departure_time', tomorrowStart.toISOString())
                .lt('departure_time', tomorrowEnd.toISOString());
              break;
              
            case 'weekend':
              // Next weekend (Saturday and Sunday)
              const nextSaturday = new Date(today);
              const daysUntilSaturday = (6 - today.getDay()) % 7;
              nextSaturday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
              const nextMonday = new Date(nextSaturday);
              nextMonday.setDate(nextSaturday.getDate() + 2);
              query = query
                .gte('departure_time', nextSaturday.toISOString())
                .lt('departure_time', nextMonday.toISOString());
              break;
              
            case 'next-week':
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              const weekAfter = new Date(nextWeek);
              weekAfter.setDate(nextWeek.getDate() + 7);
              query = query
                .gte('departure_time', nextWeek.toISOString())
                .lt('departure_time', weekAfter.toISOString());
              break;
              
            case 'next-month':
              const nextMonth = new Date(today);
              nextMonth.setMonth(today.getMonth() + 1);
              const monthAfter = new Date(nextMonth);
              monthAfter.setMonth(nextMonth.getMonth() + 1);
              query = query
                .gte('departure_time', nextMonth.toISOString())
                .lt('departure_time', monthAfter.toISOString());
              break;
          }
        }
      }

      if (searchParams?.passengers) {
        const passengerCount = parseInt(searchParams.passengers);
        if (!isNaN(passengerCount)) {
          query = query.gte('available_seats', passengerCount);
        }
      }

      // Always show future flights only
      const now = new Date().toISOString();
      query = query.gte('departure_time', now);

      const { data, error } = await query.order('departure_time');

      if (error) {
        console.error('Error fetching flights:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} flights matching search criteria:`, {
        from: searchParams?.from,
        to: searchParams?.to,
        date: searchParams?.date,
        passengers: searchParams?.passengers
      });

      return data as Flight[];
    },
    enabled: !!searchParams && (!!searchParams.from || !!searchParams.to),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export const useFlightById = (flightId: string) => {
  return useQuery({
    queryKey: ['flight', flightId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flights')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          img_destination,
          jets!flights_jet_id_fkey (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `)
        .eq('id', flightId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching flight:', error);
        throw error;
      }

      return data as Flight | null;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to get all available flights for deals sections - with de-duplication by route
export const useAllFlights = () => {
  return useQuery({
    queryKey: ['all-flights'],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('flights')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          img_destination,
          jets!flights_jet_id_fkey (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `)
        .gte('departure_time', now)
        .order('departure_time', { ascending: true });

      if (error) {
        console.error('Error fetching all flights:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} total available flights`);
      return data as Flight[];
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 8 * 60 * 1000, // 8 minutes
    refetchOnWindowFocus: false,
  });
};

// New hook specifically for deals sections with de-duplication
export const useDealsFlights = () => {
  return useQuery({
    queryKey: ['deals-flights'],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('flights')
        .select(`
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          img_destination,
          jets!flights_jet_id_fkey (
            brand,
            model,
            type,
            seating_capacity,
            range_km,
            description,
            image_url
          )
        `)
        .gte('departure_time', now)
        .order('departure_time', { ascending: true });

      if (error) {
        console.error('Error fetching deals flights:', error);
        throw error;
      }

      // De-duplicate flights by route for deals sections
      const deduplicatedFlights = deduplicateFlightsByRoute(data as Flight[]);
      
      console.log(`Found ${data?.length || 0} total flights, de-duplicated to ${deduplicatedFlights.length} unique routes for deals`);
      return deduplicatedFlights;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes for deals
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
