import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europa - Principali e Regionali
  { code: 'BRU', name: 'Brussels Airport', city: 'Bruxelles', country: 'Belgio', aliases: ['Brussels', 'Brussel'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgio' },
  { code: 'ANR', name: 'Antwerp International', city: 'Anversa', country: 'Belgio' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Paesi Bassi', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Paesi Bassi' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Paesi Bassi' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Paesi Bassi' },
  
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Parigi', country: 'Francia', aliases: ['Roissy', 'Paris'] },
  { code: 'ORY', name: 'Orly', city: 'Parigi', country: 'Francia' },
  { code: 'LBG', name: 'Le Bourget', city: 'Parigi', country: 'Francia' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nizza', country: 'Francia', aliases: ['Cannes'] },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lione', country: 'Francia' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marsiglia', country: 'Francia' },
  { code: 'TLS', name: 'Toulouse Blagnac', city: 'Tolosa', country: 'Francia' },
  { code: 'BOD', name: 'Bordeaux Mérignac', city: 'Bordeaux', country: 'Francia' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'Francia' },
  { code: 'SXB', name: 'Strasbourg', city: 'Strasburgo', country: 'Francia' },
  { code: 'CFE', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'Francia' },
  { code: 'BIA', name: 'Bastia Poretta', city: 'Bastia', country: 'Francia' },
  
  { code: 'LHR', name: 'Heathrow', city: 'Londra', country: 'Regno Unito' },
  { code: 'LGW', name: 'Gatwick', city: 'Londra', country: 'Regno Unito' },
  { code: 'STN', name: 'Stansted', city: 'Londra', country: 'Regno Unito' },
  { code: 'LTN', name: 'Luton', city: 'Londra', country: 'Regno Unito' },
  { code: 'LCY', name: 'London City', city: 'Londra', country: 'Regno Unito' },
  { code: 'FAB', name: 'Farnborough', city: 'Londra', country: 'Regno Unito' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'Londra', country: 'Regno Unito' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'Regno Unito' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Regno Unito' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edimburgo', country: 'Regno Unito' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Regno Unito' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Francoforte', country: 'Germania' },
  { code: 'MUC', name: 'Munich Airport', city: 'Monaco', country: 'Germania', aliases: ['Munich'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Germania' },
  { code: 'HAM', name: 'Hamburg', city: 'Amburgo', country: 'Germania' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlino', country: 'Germania' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Colonia', country: 'Germania' },
  { code: 'STR', name: 'Stuttgart', city: 'Stoccarda', country: 'Germania' },
  { code: 'NUE', name: 'Nuremberg', city: 'Norimberga', country: 'Germania' },
  { code: 'HAN', name: 'Hannover', city: 'Hannover', country: 'Germania' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zurigo', country: 'Svizzera' },
  { code: 'GVA', name: 'Geneva', city: 'Ginevra', country: 'Svizzera', aliases: ['Genève'] },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Basilea', country: 'Svizzera' },
  { code: 'BRN', name: 'Bern Airport', city: 'Berna', country: 'Svizzera' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria', aliases: ['Wien'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salisburgo', country: 'Austria' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Austria' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Austria' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milano', country: 'Italia', aliases: ['Milan'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Milano', country: 'Italia' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Milano', country: 'Italia' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Roma', country: 'Italia', aliases: ['Rome'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Roma', country: 'Italia' },
  { code: 'NAP', name: 'Naples', city: 'Napoli', country: 'Italia', aliases: ['Naples'] },
  { code: 'FLR', name: 'Florence', city: 'Firenze', country: 'Italia', aliases: ['Florence'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venezia', country: 'Italia', aliases: ['Venice'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venezia', country: 'Italia' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologna', country: 'Italia' },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italia' },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italia' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italia' },
  { code: 'VRN', name: 'Verona', city: 'Verona', country: 'Italia' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'Spagna' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcellona', country: 'Spagna' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spagna' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'Spagna' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'Spagna' },
  { code: 'SVQ', name: 'Sevilla', city: 'Siviglia', country: 'Spagna' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spagna' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spagna' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'Spagna' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'Spagna' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'Spagna' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbona', country: 'Portogallo', aliases: ['Lisbon'] },
  { code: 'OPO', name: 'Porto', city: 'Porto', country: 'Portogallo' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portogallo' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portogallo' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norvegia' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Norvegia' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Norvegia' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Norvegia' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stoccolma', country: 'Svezia' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Stoccolma', country: 'Svezia' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Göteborg', country: 'Svezia' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Svezia' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Copenaghen', country: 'Danimarca', aliases: ['Copenhagen'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Danimarca' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Danimarca' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finlandia' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finlandia' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Atene', country: 'Grecia' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Salonicco', country: 'Grecia' },
  { code: 'HER', name: 'Heraklion', city: 'Heraklion', country: 'Grecia' },
  { code: 'CFU', name: 'Corfu', city: 'Corfù', country: 'Grecia' },
  { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Grecia' },
  { code: 'JTR', name: 'Santorini', city: 'Santorini', country: 'Grecia' },
  { code: 'RHO', name: 'Rhodes', city: 'Rodi', country: 'Grecia' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Bucarest', country: 'Romania' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Romania' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Varsavia', country: 'Polonia' },
  { code: 'KRK', name: 'Krakow', city: 'Cracovia', country: 'Polonia' },
  { code: 'GDN', name: 'Gdansk', city: 'Danzica', country: 'Polonia' },
  { code: 'WRO', name: 'Wrocław', city: 'Wrocław', country: 'Polonia' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Praga', country: 'Repubblica Ceca' },
  { code: 'BRQ', name: 'Brno', city: 'Brno', country: 'Repubblica Ceca' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Ungheria' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Ungheria' },
  
  // Nord America - Principali Hub
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Stati Uniti' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'Stati Uniti' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'Stati Uniti' },
  { code: 'TEB', name: 'Teterboro', city: 'New York', country: 'Stati Uniti' },
  { code: 'HPN', name: 'White Plains', city: 'New York', country: 'Stati Uniti' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Stati Uniti' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Angeles', country: 'Stati Uniti' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Angeles', country: 'Stati Uniti' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Angeles', country: 'Stati Uniti' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Stati Uniti' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'Stati Uniti' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'Stati Uniti' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Stati Uniti' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'Stati Uniti' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'Stati Uniti' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Stati Uniti' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'Stati Uniti' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'Stati Uniti' },
  
  // Medio Oriente & Hub Aziendali
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Emirati Arabi Uniti' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubai', country: 'Emirati Arabi Uniti' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Emirati Arabi Uniti' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  
  // Asia-Pacifico Principali
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Giappone' },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Giappone' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'Corea del Sud' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  
  // Africa Popolare
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'Sudafrica' },
  { code: 'CPT', name: 'Cape Town International', city: 'Città del Capo', country: 'Sudafrica' },
  { code: 'CAI', name: 'Cairo International', city: 'Il Cairo', country: 'Egitto' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Marocco' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Marocco' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Stati Uniti' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Stati Uniti' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Stati Uniti' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Stati Uniti' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Stati Uniti' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Emirati Arabi Uniti' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Emirati Arabi Uniti' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
];
