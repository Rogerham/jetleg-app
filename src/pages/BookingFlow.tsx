import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Users, MapPin, Calendar, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFlightById } from '@/hooks/useFlights';
import { extractCityName } from '@/utils/flightUtils';

interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const BookingFlow = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Handle different parameter names from different routes
  const flightId = params.id || params.flightId;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      passportNumber: ''
    }
  ]);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'België'
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Use the flight from location state if available, otherwise fetch from database
  const flightFromState = location.state?.flight;
  const { data: flightFromDb, isLoading: isLoadingFlight, error } = useFlightById(flightId || '');
  
  const flight = flightFromState || flightFromDb;

  const steps = [
    { number: 1, title: 'Passagiers', description: 'Voer gegevens in' },
    { number: 2, title: 'Betaling', description: 'Betalingsgegevens' },
    { number: 3, title: 'Bevestiging', description: 'Controleer en bevestig' }
  ];

  const addPassenger = () => {
    if (flight && passengers.length < flight.available_seats) {
      setPassengers([...passengers, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        passportNumber: ''
      }]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const updatePayment = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validatePassengers = () => {
    return passengers.every(p => 
      p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth && p.passportNumber
    );
  };

  const validatePayment = () => {
    return paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && 
           paymentData.cardholderName && paymentData.billingAddress.street &&
           paymentData.billingAddress.city && paymentData.billingAddress.postalCode;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validatePassengers()) {
      toast({
        title: "Incomplete gegevens",
        description: "Vul alle passagiersgegevens in om door te gaan.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2 && !validatePayment()) {
      toast({
        title: "Incomplete betalingsgegevens",
        description: "Vul alle betalingsgegevens in om door te gaan.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBooking = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Boeking bevestigd!",
      description: "Je vlucht is succesvol geboekt. Je ontvangt een bevestiging per e-mail.",
    });

    setIsLoading(false);
    navigate(`/booking-confirmation/${flightId}`, {
      state: {
        flight,
        passengers,
        totalPrice
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

  const extractAirportCode = (airport: string) => {
    const match = airport.match(/\(([^)]+)\)/);
    return match ? match[1] : airport.slice(-3);
  };

  const extractCityName = (airport: string) => {
    return airport.split('(')[0].trim();
  };

  if (isLoadingFlight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Vluchtgegevens laden...</h3>
        </div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Vlucht niet gevonden</h3>
          <p className="text-muted-foreground mb-4">De vlucht die je zoekt bestaat niet of is niet beschikbaar.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-jetleg-primary"
          >
            Terug naar zoekresultaten
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = (flight.price_per_seat || 0) * passengers.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Terug naar resultaten
            </button>
            <div className="text-sm text-muted-foreground">
              Boeking voor vlucht {extractAirportCode(flight.departure_airport)} → {extractAirportCode(flight.arrival_airport)}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${currentStep >= step.number 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-border text-muted-foreground'
                      }`}>
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="font-medium">{step.number}</span>
                      )}
                    </div>
                    {/* Only show text for current step on mobile, always show on desktop */}
                    <div className={`ml-3 ${currentStep === step.number ? 'block' : 'hidden md:block'}`}>
                      <div className={`font-medium ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? 'bg-accent' : 'bg-border'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="card-jetleg p-6">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Passagiersgegevens</h2>
                  
                  {passengers.map((passenger, index) => (
                    <div key={index} className="mb-8 p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground">Passagier {index + 1}</h3>
                        {passengers.length > 1 && (
                          <button
                            onClick={() => removePassenger(index)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                          >
                            Verwijderen
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Voornaam *</label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Achternaam *</label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">E-mail *</label>
                          <input
                            type="email"
                            value={passenger.email}
                            onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Telefoonnummer *</label>
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Geboortedatum *</label>
                          <input
                            type="date"
                            value={passenger.dateOfBirth}
                            onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Paspoortnummer *</label>
                          <input
                            type="text"
                            value={passenger.passportNumber}
                            onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {passengers.length < flight.available_seats && (
                    <button
                      onClick={addPassenger}
                      className="btn-jetleg-outline w-full mb-6"
                    >
                      + Passagier toevoegen
                    </button>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Veilige betaling
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Payment Method */}
                    <div className="p-4 border border-border rounded-lg bg-accent/5">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-accent" />
                        <span className="font-medium text-foreground">Creditcard / Debitkaart</span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Kaartnummer *</label>
                        <input
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) => updatePayment('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="input-jetleg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Vervaldatum *</label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) => updatePayment('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="input-jetleg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">CVV *</label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) => updatePayment('cvv', e.target.value)}
                          placeholder="123"
                          className="input-jetleg"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Naam op kaart *</label>
                        <input
                          type="text"
                          value={paymentData.cardholderName}
                          onChange={(e) => updatePayment('cardholderName', e.target.value)}
                          className="input-jetleg"
                          required
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <h3 className="font-medium text-foreground mb-4">Factuuradres</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">Straat en huisnummer *</label>
                          <input
                            type="text"
                            value={paymentData.billingAddress.street}
                            onChange={(e) => updatePayment('billingAddress.street', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Stad *</label>
                          <input
                            type="text"
                            value={paymentData.billingAddress.city}
                            onChange={(e) => updatePayment('billingAddress.city', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Postcode *</label>
                          <input
                            type="text"
                            value={paymentData.billingAddress.postalCode}
                            onChange={(e) => updatePayment('billingAddress.postalCode', e.target.value)}
                            className="input-jetleg"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">Land *</label>
                          <select
                            value={paymentData.billingAddress.country}
                            onChange={(e) => updatePayment('billingAddress.country', e.target.value)}
                            className="input-jetleg"
                            required
                          >
                            <option value="België">België</option>
                            <option value="Nederland">Nederland</option>
                            <option value="Frankrijk">Frankrijk</option>
                            <option value="Duitsland">Duitsland</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Bevestiging</h2>
                  
                  {/* Flight Summary */}
                  <div className="mb-6 p-4 bg-accent/5 rounded-lg">
                    <h3 className="font-medium text-foreground mb-3">Vluchtsamenvatting</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Route:</span>
                        <span className="text-foreground">{extractCityName(flight.departure_airport)} → {extractCityName(flight.arrival_airport)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Datum:</span>
                        <span className="text-foreground">{formatDate(flight.departure_time)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vertrek:</span>
                        <span className="text-foreground">{formatTime(flight.departure_time)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Route:</span>
                        <span className="text-foreground">
                          {extractCityName(flight.departure_airport)} → {extractCityName(flight.arrival_airport)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Operator:</span>
                        <span className="text-foreground">{flight.operator}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passengers Summary */}
                  <div className="mb-6">
                    <h3 className="font-medium text-foreground mb-3">Passagiers ({passengers.length})</h3>
                    {passengers.map((passenger, index) => (
                      <div key={index} className="text-sm text-muted-foreground mb-1">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div className="mb-6 p-4 border border-border rounded-lg">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-accent" required />
                      <span className="text-sm text-foreground">
                        Ik ga akkoord met de{' '}
                        <a href="#" className="text-accent hover:underline">algemene voorwaarden</a>
                        {' '}en{' '}
                        <a href="#" className="text-accent hover:underline">privacybeleid</a>
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isLoading}
                    className="btn-jetleg-primary w-full"
                  >
                    {isLoading ? 'Bezig met boeken...' : `Betaal €${totalPrice.toLocaleString()}`}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <button onClick={handleBack} className="btn-jetleg-outline flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Vorige
                  </button>
                ) : <div />}

                {currentStep < 3 && (
                  <button onClick={handleNext} className="btn-jetleg-primary flex items-center gap-2">
                    Volgende
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-jetleg p-6 sticky top-6">
              <h3 className="font-semibold text-foreground mb-4">Boekingoverzicht</h3>
              
              {/* Flight Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-foreground">{extractAirportCode(flight.departure_airport)} → {extractAirportCode(flight.arrival_airport)}</div>
                    <div className="text-sm text-muted-foreground">{extractCityName(flight.departure_airport)} - {extractCityName(flight.arrival_airport)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-foreground">{formatDate(flight.departure_time)}</div>
                    <div className="text-sm text-muted-foreground">{formatTime(flight.departure_time)} - {formatTime(flight.arrival_time)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-foreground">{passengers.length} passagier{passengers.length !== 1 ? 's' : ''}</div>
                    <div className="text-sm text-muted-foreground">
                      {flight.jets ? `${flight.jets.brand} ${flight.jets.model}` : flight.operator}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prijs per persoon</span>
                    <span className="text-foreground">€{flight.price_per_seat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Aantal passagiers</span>
                    <span className="text-foreground">×{passengers.length}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
                    <span className="text-foreground">Totaal</span>
                    <span className="text-foreground">€{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
