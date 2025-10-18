import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';

interface FlightCardProps {
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

const FlightCard = ({ 
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
}: FlightCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const handleCardClick = () => {
    // Navigate to flight details page with flight data
    navigate(`/flight-details/${id}`, {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const getRouteDescription = () => {
    if (jets?.description) {
      return jets.description;
    }
    return jets ? `${operator} - ${jets.brand} ${jets.model}` : `${operator} - ${t('flight.privateJet')}`;
  };

  const getAircraftDetails = () => {
    return jets ? `${jets.brand} ${jets.model}` : t('flight.privateJet');
  };

  const getImageUrl = () => {
    // Use the jet's image_url, or fallback to default
    return jets?.image_url || '/src/assets/jet-interior.jpg';
  };

  return (
    <div 
      className="card-jetleg hover:scale-[1.03] transition-all duration-200 h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={getImageUrl()} 
          alt={jets ? `${jets.brand} ${jets.model}` : t('flight.privateJet')} 
          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/src/assets/jet-interior.jpg';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="deal-badge text-white bg-accent">
            {operator}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {extractCityName(departure_airport)} → {extractCityName(arrival_airport)}
            </h3>
            <p className="text-muted-foreground">
              {getRouteDescription()}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.date')}</strong> {formatDate(departure_time)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.departure')}</strong> {formatTime(departure_time)} - {formatTime(arrival_time)} ({flight_duration})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.available')}</strong> {available_seats} {t('flight.seats')}</span>
          </div>
        </div>
        
        {/* Price display */}
        <div className="mt-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('deals.from')}</p>
              <p className="text-3xl font-bold text-foreground">
                {formatPrice(price_per_seat)}
              </p>
            </div>
            <Button 
              variant="default" 
              size="default"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="whitespace-nowrap"
            >
              {t('search.results.moreDetails')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
