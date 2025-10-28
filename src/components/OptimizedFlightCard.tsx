import React from 'react';
import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getDiscountedPriceInfo } from '@/utils/priceUtils';

interface OptimizedFlightCardProps {
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

const OptimizedFlightCard = React.memo(({ 
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
}: OptimizedFlightCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const handleViewDetails = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/flight-details/${id}`, { 
      state: { 
        flight: {
          id, departure_airport, arrival_airport, departure_time, arrival_time,
          price_per_seat, available_seats, operator, flight_duration, jet_id, jets
        }
      }
    });
  }, [id, departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id, jets, navigate]);

  const handleCardClick = React.useCallback(() => {
    navigate(`/flight-details/${id}`, { 
      state: { 
        flight: {
          id, departure_airport, arrival_airport, departure_time, arrival_time,
          price_per_seat, available_seats, operator, flight_duration, jet_id, jets
        }
      }
    });
  }, [id, departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, jet_id, jets, navigate]);

  const formatTime = React.useMemo(() => (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit', minute: '2-digit'
    });
  }, []);

  const formatDate = React.useMemo(() => (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  }, []);

  const routeDescription = React.useMemo(() => {
    if (jets?.description) return jets.description;
    return jets ? `${operator} - ${jets.brand} ${jets.model}` : `${operator} - ${t('flight.privateJet')}`;
  }, [jets, operator, t]);

  const aircraftDetails = React.useMemo(() => {
    return jets ? `${jets.brand} ${jets.model}` : t('flight.privateJet');
  }, [jets, t]);

  const imageUrl = React.useMemo(() => {
    return jets?.image_url || '/src/assets/jet-interior.jpg';
  }, [jets?.image_url]);

  const { originalPrice, currentPrice, discountPercentage } = React.useMemo(
    () => getDiscountedPriceInfo(price_per_seat, id),
    [price_per_seat, id]
  );
  
  const formattedPrice = React.useMemo(() => formatPrice(currentPrice), [formatPrice, currentPrice]);
  const formattedOriginalPrice = React.useMemo(() => formatPrice(originalPrice), [formatPrice, originalPrice]);
  const formattedDate = React.useMemo(() => formatDate(departure_time), [formatDate, departure_time]);
  const formattedDepartureTime = React.useMemo(() => formatTime(departure_time), [formatTime, departure_time]);
  const formattedArrivalTime = React.useMemo(() => formatTime(arrival_time), [formatTime, arrival_time]);

  return (
    <div 
      className="card-jetleg hover:scale-[1.03] transition-all duration-200 h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={jets ? `${jets.brand} ${jets.model}` : t('flight.privateJet')} 
          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
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
              {routeDescription}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.date')}</strong> {formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.departure')}</strong> {formattedDepartureTime} - {formattedArrivalTime} ({flight_duration})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('flight.available')}</strong> {available_seats} {t('flight.seats')}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-auto">
          <div>
            <p className="text-sm text-muted-foreground line-through">
              {formattedOriginalPrice}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl font-bold text-foreground">
                {formattedPrice}
              </p>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                {discountPercentage}%
              </span>
            </div>
          </div>
          <button 
            onClick={handleViewDetails}
            className="btn-jetleg-secondary hover:bg-accent hover:text-primary-foreground w-full sm:w-auto"
          >
            Meer details
          </button>
        </div>
      </div>
    </div>
  );
});

OptimizedFlightCard.displayName = 'OptimizedFlightCard';

export default OptimizedFlightCard;