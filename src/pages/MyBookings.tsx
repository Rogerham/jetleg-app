
import { useState } from 'react';
import { Calendar, MapPin, Users, Plane, Clock, Download, Eye, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBookings } from '@/hooks/useBookings';
import { extractCityName } from '@/utils/flightUtils';

interface UIBooking {
  id: string;
  bookingReference: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  flight: {
    from: string;
    to: string;
    fromCode: string;
    toCode: string;
    date: string;
    departure: string;
    arrival: string;
    aircraft: string;
    duration: string;
  };
  passengers: number;
  totalPrice: number;
  bookingDate: string;
}

const MyBookings = ({ hideNavigation = false, onBackToProfile }: { hideNavigation?: boolean; onBackToProfile?: () => void }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const { data: bookings, isLoading } = useBookings();

  // Transform database bookings to UI format
  const transformedBookings: UIBooking[] = (bookings || []).map(booking => {
    const flight = booking.flights;
    if (!flight) return null;

    const departureDate = new Date(flight.departure_time);
    const arrivalDate = new Date(flight.arrival_time);

    return {
      id: booking.id,
      bookingReference: `JL-${booking.id.slice(0, 8).toUpperCase()}`,
      status: booking.booking_status,
      flight: {
        from: extractCityName(flight.departure_airport),
        to: extractCityName(flight.arrival_airport),
        fromCode: flight.departure_airport.split('(').pop()?.replace(')', '').trim() || '',
        toCode: flight.arrival_airport.split('(').pop()?.replace(')', '').trim() || '',
        date: departureDate.toISOString().split('T')[0],
        departure: departureDate.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
        arrival: arrivalDate.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
        aircraft: flight.jets ? `${flight.jets.brand} ${flight.jets.model}` : flight.operator,
        duration: flight.flight_duration
      },
      passengers: booking.passenger_count,
      totalPrice: booking.total_price,
      bookingDate: new Date(booking.created_at).toISOString().split('T')[0]
    };
  }).filter((b): b is UIBooking => b !== null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t('myBookings.status.confirmed');
      case 'pending': return t('myBookings.status.pending');
      case 'cancelled': return t('myBookings.status.cancelled');
      case 'completed': return t('myBookings.status.completed');
      default: return status;
    }
  };

  const filterBookings = (bookings: UIBooking[]) => {
    const now = new Date();
    switch (activeTab) {
      case 'upcoming':
        return bookings.filter(b => new Date(b.flight.date) >= now && b.status !== 'cancelled');
      case 'past':
        return bookings.filter(b => new Date(b.flight.date) < now || b.status === 'completed');
      default:
        return bookings;
    }
  };

  const filteredBookings = filterBookings(transformedBookings);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('myBookings.title')}</h1>
            <p className="text-muted-foreground">{t('myBookings.subtitle')}</p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Boekingen laden...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hideNavigation) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {onBackToProfile && (
            <button
              onClick={onBackToProfile}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('myBookings.backToProfile')}
            </button>
          )}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('myBookings.title')}</h1>
            <p className="text-muted-foreground">{t('myBookings.subtitle')}</p>
          </div>

          {/* ... keep existing code (tabs and bookings list) */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {[
                  { key: 'upcoming', label: t('myBookings.tabs.upcoming'), count: transformedBookings.filter(b => new Date(b.flight.date) >= new Date() && b.status !== 'cancelled').length },
                  { key: 'past', label: t('myBookings.tabs.past'), count: transformedBookings.filter(b => new Date(b.flight.date) < new Date() || b.status === 'completed').length },
                  { key: 'all', label: t('myBookings.tabs.all'), count: transformedBookings.length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('myBookings.noBookings')}</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'upcoming' 
                  ? t('myBookings.noUpcoming')
                  : activeTab === 'past'
                  ? t('myBookings.noPast')
                  : t('myBookings.noBookingsYet')
                }
              </p>
              <Link to="/" className="btn-jetleg-primary">
                {t('myBookings.findFlight')}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="card-jetleg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {booking.flight.from} → {booking.flight.to}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('myBookings.bookingReference')}: {booking.bookingReference}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {new Date(booking.flight.date).toLocaleDateString('nl-NL', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.flight.departure} - {booking.flight.arrival}
                              </p>
                              <p className="text-sm text-muted-foreground">{booking.flight.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.passengers} {booking.passengers === 1 ? 'passagier' : 'passagiers'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-foreground">{booking.flight.departure}</div>
                            <div className="text-sm text-muted-foreground">{booking.flight.fromCode}</div>
                          </div>
                          
                          <div className="flex-1 relative">
                            <div className="border-t border-dashed border-border"></div>
                            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 bg-background px-2">
                              <Plane className="h-4 w-4 text-accent" />
                            </div>
                            <div className="text-center text-xs text-muted-foreground mt-1">
                              {booking.flight.duration}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-xl font-bold text-foreground">{booking.flight.arrival}</div>
                            <div className="text-sm text-muted-foreground">{booking.flight.toCode}</div>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">{t('myBookings.aircraft')}:</span> {booking.flight.aircraft}</p>
                          <p><span className="font-medium">{t('myBookings.bookedOn')}:</span> {new Date(booking.bookingDate).toLocaleDateString('nl-NL')}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-1 text-center lg:text-right">
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-foreground mb-1">
                            €{booking.totalPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">{t('myBookings.totalPaid')}</div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button className="btn-jetleg-outline flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            {t('myBookings.viewDetails')}
                          </button>
                          <button className="btn-jetleg-outline flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            {t('myBookings.downloadTicket')}
                          </button>
                          
                          {booking.status === 'confirmed' && new Date(booking.flight.date) > new Date() && (
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">
                              {t('myBookings.cancel')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mijn Boekingen</h1>
            <p className="text-muted-foreground">Bekijk en beheer al je vluchten</p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {[
                  { key: 'upcoming', label: 'Aankomende vluchten', count: transformedBookings.filter(b => new Date(b.flight.date) >= new Date() && b.status !== 'cancelled').length },
                  { key: 'past', label: 'Eerdere vluchten', count: transformedBookings.filter(b => new Date(b.flight.date) < new Date() || b.status === 'completed').length },
                  { key: 'all', label: 'Alle boekingen', count: transformedBookings.length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Geen boekingen gevonden</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'upcoming' 
                  ? 'Je hebt nog geen aankomende vluchten.'
                  : activeTab === 'past'
                  ? 'Je hebt nog geen eerdere vluchten.'
                  : 'Je hebt nog geen boekingen gemaakt.'
                }
              </p>
              <Link to="/" className="btn-jetleg-primary">
                Vind je volgende vlucht
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="card-jetleg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {booking.flight.from} → {booking.flight.to}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Boekingsreferentie: {booking.bookingReference}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Flight Details */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {new Date(booking.flight.date).toLocaleDateString('nl-NL', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.flight.departure} - {booking.flight.arrival}
                              </p>
                              <p className="text-sm text-muted-foreground">{booking.flight.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.passengers} {booking.passengers === 1 ? 'passagier' : 'passagiers'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-foreground">{booking.flight.departure}</div>
                            <div className="text-sm text-muted-foreground">{booking.flight.fromCode}</div>
                          </div>
                          
                          <div className="flex-1 relative">
                            <div className="border-t border-dashed border-border"></div>
                            <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 bg-background px-2">
                              <Plane className="h-4 w-4 text-accent" />
                            </div>
                            <div className="text-center text-xs text-muted-foreground mt-1">
                              {booking.flight.duration}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-xl font-bold text-foreground">{booking.flight.arrival}</div>
                            <div className="text-sm text-muted-foreground">{booking.flight.toCode}</div>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p><span className="font-medium">Vliegtuig:</span> {booking.flight.aircraft}</p>
                          <p><span className="font-medium">Geboekt op:</span> {new Date(booking.bookingDate).toLocaleDateString('nl-NL')}</p>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="lg:col-span-1 text-center lg:text-right">
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-foreground mb-1">
                            €{booking.totalPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">totaal betaald</div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button className="btn-jetleg-outline flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            Bekijk details
                          </button>
                          <button className="btn-jetleg-outline flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            Download ticket
                          </button>
                          
                          {booking.status === 'confirmed' && new Date(booking.flight.date) > new Date() && (
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">
                              Annuleren
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
