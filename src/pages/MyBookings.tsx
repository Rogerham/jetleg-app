
import { useState } from 'react';
import { Calendar, MapPin, Users, Plane, Clock, Download, Eye, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
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

const MyBookings = ({ hideNavigation = false }: { hideNavigation?: boolean }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  
  const mockBookings: Booking[] = [
    {
      id: '1',
      bookingReference: 'JL-2024-001',
      status: 'confirmed',
      flight: {
        from: 'Brussels',
        to: 'Nice',
        fromCode: 'BRU',
        toCode: 'NCE',
        date: '2024-08-15',
        departure: '14:30',
        arrival: '16:15',
        aircraft: 'Cessna Citation CJ3+',
        duration: '1h 45m'
      },
      passengers: 2,
      totalPrice: 4900,
      bookingDate: '2024-07-20'
    },
    {
      id: '2',
      bookingReference: 'JL-2024-002',
      status: 'completed',
      flight: {
        from: 'Brussels',
        to: 'Paris',
        fromCode: 'BRU',
        toCode: 'CDG',
        date: '2024-07-10',
        departure: '09:15',
        arrival: '10:00',
        aircraft: 'Embraer Phenom 300',
        duration: '45m'
      },
      passengers: 1,
      totalPrice: 1890,
      bookingDate: '2024-06-15'
    },
    {
      id: '3',
      bookingReference: 'JL-2024-003',
      status: 'pending',
      flight: {
        from: 'Brussels',
        to: 'London',
        fromCode: 'BRU',
        toCode: 'LHR',
        date: '2024-09-01',
        departure: '16:45',
        arrival: '17:05',
        aircraft: 'Bombardier Challenger 350',
        duration: '1h 20m'
      },
      passengers: 4,
      totalPrice: 12800,
      bookingDate: '2024-07-25'
    }
  ];

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
      case 'confirmed': return 'Bevestigd';
      case 'pending': return 'In behandeling';
      case 'cancelled': return 'Geannuleerd';
      case 'completed': return 'Voltooid';
      default: return status;
    }
  };

  const filterBookings = (bookings: Booking[]) => {
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

  const filteredBookings = filterBookings(mockBookings);

  if (hideNavigation) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mijn Boekingen</h1>
            <p className="text-muted-foreground">Bekijk en beheer al je vluchten</p>
          </div>

          {/* ... keep existing code (tabs and bookings list) */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {[
                  { key: 'upcoming', label: 'Aankomende vluchten', count: filterBookings(mockBookings.filter(b => activeTab !== 'upcoming')).length },
                  { key: 'past', label: 'Eerdere vluchten', count: filterBookings(mockBookings.filter(b => activeTab !== 'past')).length },
                  { key: 'all', label: 'Alle boekingen', count: mockBookings.length }
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
                  { key: 'upcoming', label: 'Aankomende vluchten', count: filterBookings(mockBookings.filter(b => activeTab !== 'upcoming')).length },
                  { key: 'past', label: 'Eerdere vluchten', count: filterBookings(mockBookings.filter(b => activeTab !== 'past')).length },
                  { key: 'all', label: 'Alle boekingen', count: mockBookings.length }
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
