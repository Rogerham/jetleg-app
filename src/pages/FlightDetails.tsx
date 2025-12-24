import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Plane, MapPin, Calendar, Star, Wifi, Utensils, Armchair, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFlightById, type Flight } from '@/hooks/useFlights';
import { useCurrency } from '@/contexts/CurrencyContext';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';
import { useTranslation } from 'react-i18next';
import { getDiscountedPriceInfo, calculatePricePerPerson } from '@/utils/priceUtils';
const FlightDetails = () => {
  const {
    flightId
  } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    formatPrice
  } = useCurrency();
  const {
    t
  } = useTranslation();

  // Use the flight from location state if available, otherwise fetch from database
  const flightFromState = location.state?.flight;
  const {
    data: flightFromDb,
    isLoading,
    error
  } = useFlightById(flightId || '');
  const flight = flightFromState || flightFromDb;
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleBookFlight = () => {
    if (flight) {
      navigate(`/booking/${flightId}`, {
        state: {
          flight,
          searchData: location.state?.searchData || {
            from: flight.departure_airport,
            to: flight.arrival_airport,
            date: flight.departure_time,
            passengers: '1'
          }
        }
      });
    }
  };
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-foreground mb-2">{t('flightDetails.loading')}</h3>
        </div>
      </div>;
  }
  if (error || !flight) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">{t('flightDetails.notFound')}</h3>
          <p className="text-muted-foreground mb-4">{t('flightDetails.notFoundDesc')}</p>
          <button onClick={() => navigate('/')} className="btn-jetleg-primary">
            {t('flightDetails.backToResults')}
          </button>
        </div>
      </div>;
  }
  const departureCity = extractCityName(flight.departure_airport);
  const departureCode = extractAirportCode(flight.departure_airport);
  const arrivalCity = extractCityName(flight.arrival_airport);
  const arrivalCode = extractAirportCode(flight.arrival_airport);
  const aircraftName = `${flight.jets?.brand} ${flight.jets?.model}`;
  const {
    originalPrice,
    currentPrice,
    discountPercentage
  } = getDiscountedPriceInfo(flight.price_per_seat, flight.id);
  const pricePerPerson = flight.jets?.seating_capacity ? calculatePricePerPerson(currentPrice, flight.jets.seating_capacity) : null;
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('flightDetails.backToResults')}
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{t('flightDetails.title')}</h1>
          <p className="text-white/90 mt-2">
            {departureCity} ({departureCode}) → {arrivalCity} ({arrivalCode})
          </p>
        </div>
      </div>

      {/* Booking CTA */}
      <div className="bg-background border-b border-border">
        
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flight Overview */}
            <div className="card-jetleg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">{t('flightDetails.overview')}</h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('flightDetails.available')}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Departure */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{formatTime(flight.departure_time)}</div>
                  <div className="text-lg font-medium text-foreground mt-1">{departureCity}</div>
                  <div className="text-sm text-muted-foreground">{departureCode}</div>
                  <div className="text-sm text-muted-foreground mt-2">{formatDate(flight.departure_time)}</div>
                </div>

                {/* Flight Duration */}
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{flight.flight_duration}</span>
                  </div>
                  <div className="w-full relative">
                    <div className="border-t-2 border-dashed border-border"></div>
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-background px-2">
                      <Plane className="h-5 w-5 text-accent rotate-90" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('flightDetails.directFlight')}</div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{formatTime(flight.arrival_time)}</div>
                  <div className="text-lg font-medium text-foreground mt-1">{arrivalCity}</div>
                  <div className="text-sm text-muted-foreground">{arrivalCode}</div>
                  <div className="text-sm text-muted-foreground mt-2">{formatDate(flight.arrival_time)}</div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Flight Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">{t('flightDetails.operator')}</div>
                  <div className="font-medium text-foreground">{flight.operator}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{t('flightDetails.route')}</div>
                  <div className="font-medium text-foreground">{extractCityName(flight.departure_airport)} → {extractCityName(flight.arrival_airport)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{t('flightDetails.availableSeats')}</div>
                  <div className="font-medium text-foreground">{flight.available_seats} van {flight.jets?.seating_capacity}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{t('flightDetails.flightNumber')}</div>
                  <div className="font-medium text-foreground">EJ-{flight.id}</div>
                </div>
              </div>
            </div>

            {/* Aircraft Details */}
            <div className="card-jetleg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t('flightDetails.aircraftDetails')}</h2>
              
              {flight.jets?.image_url && <div className="mb-6">
                  <img src={flight.jets.image_url} alt={aircraftName} className="w-full h-64 object-cover rounded-lg" />
                </div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">{t('flightDetails.specifications')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('flightDetails.brandModel')}</span>
                      <span className="font-medium text-foreground">{aircraftName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('flightDetails.seats')}</span>
                      <span className="font-medium text-foreground">{flight.jets?.seating_capacity} {t('flightDetails.passengers')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('flightDetails.cruiseSpeed')}</span>
                      <span className="font-medium text-foreground">464 km/u</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('flightDetails.maxAltitude')}</span>
                      <span className="font-medium text-foreground">45,000 ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('flightDetails.range')}</span>
                      <span className="font-medium text-foreground">{flight.jets?.range_km?.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">{t('flightDetails.amenities')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Wifi className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground">{t('flightDetails.wifi')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Utensils className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground">{t('flightDetails.refreshments')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Armchair className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground">{t('flightDetails.leatherSeats')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Coffee className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground">{t('flightDetails.coffeeService')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Terms */}
            <div className="card-jetleg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t('flightDetails.bookingTerms')}</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('flightDetails.cancellationPolicy')}</h4>
                  <p>{t('flightDetails.cancellationPolicyDesc')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('flightDetails.baggage')}</h4>
                  <p>{t('flightDetails.baggageDesc')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('flightDetails.catering')}</h4>
                  <p>{t('flightDetails.cateringDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-jetleg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-lg text-muted-foreground line-through mb-2">
                  {formatPrice(originalPrice)}
                </div>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-3xl font-bold text-accent">
                    {formatPrice(currentPrice)}
                  </div>
                  <span className="text-sm font-semibold px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                    {discountPercentage}% korting
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Totale prijs voor de hele jet
                </div>
                {pricePerPerson && <div className="text-sm text-muted-foreground">
                    Ca. {formatPrice(pricePerPerson)} per persoon
                    <div className="text-xs opacity-75">
                      (gebaseerd op {flight.jets?.seating_capacity} zitplaatsen)
                    </div>
                  </div>}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('flightDetails.date')}</span>
                  <span className="font-medium text-foreground">{formatDate(flight.departure_time)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('flightDetails.passengers')}</span>
                  <span className="font-medium text-foreground">1 {t('flightDetails.passenger')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('flightDetails.availableSeats')}</span>
                  <span className="font-medium text-foreground">{flight.available_seats}</span>
                </div>
              </div>

              <Button onClick={handleBookFlight} className="w-full btn-jetleg-primary h-12 text-lg">
                <Users className="h-5 w-5 mr-2" />
                {t('flightDetails.bookFlight')}
              </Button>

              <div className="mt-4 text-xs text-muted-foreground text-center">
                {t('flightDetails.noHiddenCosts')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FlightDetails;