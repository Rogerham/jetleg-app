import { Plane, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ListFlightCardProps {
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

const ListFlightCard = ({ 
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
  jets
}: ListFlightCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const handleBooking = () => {
    navigate(`/booking-flow/${id}`, {
      state: {
        flight: {
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
          jets
        }
      }
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAircraftDetails = () => {
    return jets ? `${jets.brand} ${jets.model}` : t('flight.privateJet');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Flight times and route */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-foreground">
              {formatTime(departure_time)}
            </div>
            <div className="text-sm text-muted-foreground">
              {extractAirportCode(departure_airport)}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Plane className="h-5 w-5 text-accent mb-1" />
            <div className="text-sm text-muted-foreground">
              {flight_duration}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-foreground">
              {formatTime(arrival_time)}
            </div>
            <div className="text-sm text-muted-foreground">
              {extractAirportCode(arrival_airport)}
            </div>
          </div>
        </div>
      </div>

      {/* Aircraft and details */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {getAircraftDetails()}
        </h3>
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{available_seats} beschikbaar</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{operator}</span>
          </div>
        </div>
      </div>

      {/* Price and booking button */}
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-foreground">
          {formatPrice(price_per_seat)}
        </div>
        <button 
          onClick={handleBooking}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Boek Nu
        </button>
      </div>
    </div>
  );
};

export default ListFlightCard;