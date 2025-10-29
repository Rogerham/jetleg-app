
import { Clock, Users, Plane } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';
import type { Flight } from '@/hooks/useFlights';
import { getDiscountedPriceInfo } from '@/utils/priceUtils';

interface ResponsiveFlightCardProps extends Flight {
  showImage?: boolean;
  imagePosition?: 'left' | 'right' | 'none';
}

const ResponsiveFlightCard = ({ 
  showImage = true, 
  imagePosition = 'left',
  ...flight 
}: ResponsiveFlightCardProps) => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewDetails = () => {
    // Navigate to flight details page with flight data
    navigate(`/flight-details/${flight.id}`, {
      state: {
        flight: flight
      }
    });
  };

  // Helper functions to get the correct data
  const getFromCity = () => extractCityName(flight.departure_airport);
  const getToCity = () => extractCityName(flight.arrival_airport);
  const getAircraftName = () => flight.jets ? `${flight.jets.brand} ${flight.jets.model}` : t('flight.privateJet');
  const getImageUrl = () => flight.jets?.image_url || '/src/assets/hero-bg.jpg';
  const getPassengerCount = () => flight.available_seats;
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const { originalPrice, currentPrice, discountPercentage } = getDiscountedPriceInfo(flight.price_per_seat, flight.id);

  return (
    <div className="card-jetleg p-4 sm:p-6 hover:scale-105 transition-all duration-200 h-full flex flex-col">
      {/* Mobile Layout - No Image */}
      <div className="block sm:hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">{getFromCity()} → {getToCity()}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.flight_duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{getPassengerCount()} pax</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Originele jet prijs</p>
            <p className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</p>
            <div className="flex items-center gap-1 justify-end">
              <p className="text-2xl font-bold text-foreground">{formatPrice(currentPrice)}</p>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                {discountPercentage}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>{t('flight.departure')}: {formatTime(flight.departure_time)}</p>
            <p>{t('nav.operators')}: {flight.operator}</p>
          </div>
          <button 
            onClick={handleViewDetails}
            className="btn-jetleg-primary text-sm px-4 py-2"
          >
            Meer details
          </button>
        </div>
      </div>

      {/* Tablet Layout - Image Right */}
      <div className="hidden sm:block md:hidden">
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">{getFromCity()} → {getToCity()}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.flight_duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{getPassengerCount()} pax</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              <p>{t('flight.departure')}: {formatTime(flight.departure_time)}</p>
              <p>{t('nav.operators')}: {flight.operator}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Originele jet prijs</p>
                <p className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-foreground">{formatPrice(currentPrice)}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                    {discountPercentage}%
                  </span>
                </div>
              </div>
              <button 
                onClick={handleViewDetails}
                className="btn-jetleg-primary"
              >
                Meer details
              </button>
            </div>
          </div>
          {showImage && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={getImageUrl()} 
                alt={getAircraftName()}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout - Standard */}
      <div className="hidden md:block">
        <div className="flex gap-4">
          {showImage && imagePosition === 'left' && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={getImageUrl()} 
                alt={getAircraftName()}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">{getFromCity()} → {getToCity()}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.flight_duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{getPassengerCount()} pax</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{t('flight.departure')}: {formatTime(flight.departure_time)}</p>
              <p>{t('nav.operators')}: {flight.operator}</p>
            </div>
          </div>
          
          {showImage && imagePosition === 'right' && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={getImageUrl()} 
                alt={getAircraftName()}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
          
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Originele jet prijs</p>
              <p className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</p>
              <div className="flex items-center gap-2 justify-end mt-1">
                <p className="text-2xl font-bold text-foreground">{formatPrice(currentPrice)}</p>
                <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                  {discountPercentage}%
                </span>
              </div>
            </div>
            <button 
              onClick={handleViewDetails}
              className="btn-jetleg-primary mt-4"
            >
              Meer details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFlightCard;
