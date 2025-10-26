import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europe - Major and Regional
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium', aliases: ['Brussel', 'Bruxelles'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgium' },
  { code: 'ANR', name: 'Antwerp International', city: 'Antwerp', country: 'Belgium' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Netherlands' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Netherlands' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Netherlands' },
  
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', aliases: ['Roissy'] },
  { code: 'ORY', name: 'Orly', city: 'Paris', country: 'France' },
  { code: 'LBG', name: 'Le Bourget', city: 'Paris', country: 'France' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice', country: 'France', aliases: ['Cannes'] },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lyon', country: 'France' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marseille', country: 'France' },
  { code: 'TLS', name: 'Toulouse Blagnac', city: 'Toulouse', country: 'France' },
  { code: 'BOD', name: 'Bordeaux Mérignac', city: 'Bordeaux', country: 'France' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'France' },
  { code: 'SXB', name: 'Strasbourg', city: 'Strasbourg', country: 'France' },
  { code: 'CFE', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'France' },
  { code: 'BIA', name: 'Bastia Poretta', city: 'Bastia', country: 'France' },
  
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom' },
  { code: 'LGW', name: 'Gatwick', city: 'London', country: 'United Kingdom' },
  { code: 'STN', name: 'Stansted', city: 'London', country: 'United Kingdom' },
  { code: 'LTN', name: 'Luton', city: 'London', country: 'United Kingdom' },
  { code: 'LCY', name: 'London City', city: 'London', country: 'United Kingdom' },
  { code: 'FAB', name: 'Farnborough', city: 'London', country: 'United Kingdom' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'London', country: 'United Kingdom' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'United Kingdom' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'United Kingdom' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh', country: 'United Kingdom' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'United Kingdom' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany', aliases: ['München'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Germany' },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburg', country: 'Germany' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Cologne', country: 'Germany' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Germany' },
  { code: 'NUE', name: 'Nuremberg', city: 'Nuremberg', country: 'Germany' },
  { code: 'HAN', name: 'Hannover', city: 'Hannover', country: 'Germany' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { code: 'GVA', name: 'Geneva', city: 'Geneva', country: 'Switzerland', aliases: ['Genève'] },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Basel', country: 'Switzerland' },
  { code: 'BRN', name: 'Bern Airport', city: 'Bern', country: 'Switzerland' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria', aliases: ['Wien'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salzburg', country: 'Austria' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Austria' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Austria' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy', aliases: ['Milano'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Milan', country: 'Italy' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Milan', country: 'Italy' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italy', aliases: ['Roma'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Rome', country: 'Italy' },
  { code: 'NAP', name: 'Naples', city: 'Naples', country: 'Italy', aliases: ['Napoli'] },
  { code: 'FLR', name: 'Florence', city: 'Florence', country: 'Italy', aliases: ['Firenze'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy', aliases: ['Venezia'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venice', country: 'Italy' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologna', country: 'Italy' },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italy' },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italy' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italy' },
  { code: 'VRN', name: 'Verona', city: 'Verona', country: 'Italy' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona', country: 'Spain' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spain' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'Spain' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'Spain' },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'Spain' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spain' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spain' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'Spain' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'Spain' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'Spain' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbon', country: 'Portugal', aliases: ['Lisboa'] },
  { code: 'OPO', name: 'Porto', city: 'Porto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portugal' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norway' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Norway' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Norway' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Norway' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Stockholm', country: 'Sweden' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Gothenburg', country: 'Sweden' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Sweden' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen', country: 'Denmark', aliases: ['København'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Denmark' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Denmark' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finland' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finland' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athens', country: 'Greece' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Thessaloniki', country: 'Greece' },
  { code: 'HER', name: 'Heraklion', city: 'Heraklion', country: 'Greece' },
  { code: 'CFU', name: 'Corfu', city: 'Corfu', country: 'Greece' },
  { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Greece' },
  { code: 'JTR', name: 'Santorini', city: 'Santorini', country: 'Greece' },
  { code: 'RHO', name: 'Rhodes', city: 'Rhodes', country: 'Greece' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Bucharest', country: 'Romania' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Romania' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw', country: 'Poland' },
  { code: 'KRK', name: 'Krakow', city: 'Krakow', country: 'Poland' },
  { code: 'GDN', name: 'Gdansk', city: 'Gdansk', country: 'Poland' },
  { code: 'WRO', name: 'Wrocław', city: 'Wrocław', country: 'Poland' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Prague', country: 'Czech Republic' },
  { code: 'BRQ', name: 'Brno', city: 'Brno', country: 'Czech Republic' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Hungary' },
  
  // North America - Major Hubs
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'United States' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'United States' },
  { code: 'TEB', name: 'Teterboro', city: 'New York', country: 'United States' },
  { code: 'HPN', name: 'White Plains', city: 'New York', country: 'United States' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Angeles', country: 'United States' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Angeles', country: 'United States' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Angeles', country: 'United States' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'United States' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'United States' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'United States' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'United States' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'United States' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'United States' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'United States' },
  
  // Middle East & Business Hubs
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  
  // Asia Pacific Major
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  
  // Africa Popular
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  { code: 'CAI', name: 'Cairo International', city: 'Cairo', country: 'Egypt' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Morocco' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Morocco' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'United States' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
];
