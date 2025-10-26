import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europa - Principales y Regionales
  { code: 'BRU', name: 'Brussels Airport', city: 'Bruselas', country: 'Bélgica', aliases: ['Brussels', 'Brussel'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Bélgica' },
  { code: 'ANR', name: 'Antwerp International', city: 'Amberes', country: 'Bélgica' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Ámsterdam', country: 'Países Bajos', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Róterdam', country: 'Países Bajos' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Países Bajos' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Países Bajos' },
  
  { code: 'CDG', name: 'Charles de Gaulle', city: 'París', country: 'Francia', aliases: ['Roissy', 'Paris'] },
  { code: 'ORY', name: 'Orly', city: 'París', country: 'Francia' },
  { code: 'LBG', name: 'Le Bourget', city: 'París', country: 'Francia' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Niza', country: 'Francia', aliases: ['Cannes'] },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lyon', country: 'Francia' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marsella', country: 'Francia' },
  { code: 'TLS', name: 'Toulouse Blagnac', city: 'Toulouse', country: 'Francia' },
  { code: 'BOD', name: 'Bordeaux Mérignac', city: 'Burdeos', country: 'Francia' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'Francia' },
  { code: 'SXB', name: 'Strasbourg', city: 'Estrasburgo', country: 'Francia' },
  { code: 'CFE', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'Francia' },
  { code: 'BIA', name: 'Bastia Poretta', city: 'Bastia', country: 'Francia' },
  
  { code: 'LHR', name: 'Heathrow', city: 'Londres', country: 'Reino Unido' },
  { code: 'LGW', name: 'Gatwick', city: 'Londres', country: 'Reino Unido' },
  { code: 'STN', name: 'Stansted', city: 'Londres', country: 'Reino Unido' },
  { code: 'LTN', name: 'Luton', city: 'Londres', country: 'Reino Unido' },
  { code: 'LCY', name: 'London City', city: 'Londres', country: 'Reino Unido' },
  { code: 'FAB', name: 'Farnborough', city: 'Londres', country: 'Reino Unido' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'Londres', country: 'Reino Unido' },
  { code: 'MAN', name: 'Manchester', city: 'Mánchester', country: 'Reino Unido' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Reino Unido' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edimburgo', country: 'Reino Unido' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Reino Unido' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Fráncfort', country: 'Alemania' },
  { code: 'MUC', name: 'Munich Airport', city: 'Múnich', country: 'Alemania', aliases: ['Munich'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Alemania' },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburgo', country: 'Alemania' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlín', country: 'Alemania' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Colonia', country: 'Alemania' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Alemania' },
  { code: 'NUE', name: 'Nuremberg', city: 'Núremberg', country: 'Alemania' },
  { code: 'HAN', name: 'Hannover', city: 'Hanóver', country: 'Alemania' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zúrich', country: 'Suiza' },
  { code: 'GVA', name: 'Geneva', city: 'Ginebra', country: 'Suiza', aliases: ['Genève'] },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Basilea', country: 'Suiza' },
  { code: 'BRN', name: 'Bern Airport', city: 'Berna', country: 'Suiza' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Viena', country: 'Austria', aliases: ['Vienna'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salzburgo', country: 'Austria' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Austria' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Austria' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milán', country: 'Italia', aliases: ['Milan'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Milán', country: 'Italia' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Milán', country: 'Italia' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Roma', country: 'Italia', aliases: ['Rome'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Roma', country: 'Italia' },
  { code: 'NAP', name: 'Naples', city: 'Nápoles', country: 'Italia', aliases: ['Naples'] },
  { code: 'FLR', name: 'Florence', city: 'Florencia', country: 'Italia', aliases: ['Florence'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venecia', country: 'Italia', aliases: ['Venice'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venecia', country: 'Italia' },
  { code: 'BLQ', name: 'Bologna', city: 'Bolonia', country: 'Italia' },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italia' },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italia' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italia' },
  { code: 'VRN', name: 'Verona', city: 'Verona', country: 'Italia' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'España' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona', country: 'España' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'España' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'España' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'España' },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'España' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'España' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'España' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'España' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'España' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'España' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisboa', country: 'Portugal', aliases: ['Lisbon'] },
  { code: 'OPO', name: 'Porto', city: 'Oporto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portugal' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Noruega' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Noruega' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Noruega' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Noruega' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Estocolmo', country: 'Suecia' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Estocolmo', country: 'Suecia' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Gotemburgo', country: 'Suecia' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Suecia' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhague', country: 'Dinamarca', aliases: ['Copenhagen'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Dinamarca' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Dinamarca' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finlandia' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finlandia' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Atenas', country: 'Grecia' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Tesalónica', country: 'Grecia' },
  { code: 'HER', name: 'Heraklion', city: 'Heraclión', country: 'Grecia' },
  { code: 'CFU', name: 'Corfu', city: 'Corfú', country: 'Grecia' },
  { code: 'JMK', name: 'Mykonos', city: 'Miconos', country: 'Grecia' },
  { code: 'JTR', name: 'Santorini', city: 'Santorini', country: 'Grecia' },
  { code: 'RHO', name: 'Rhodes', city: 'Rodas', country: 'Grecia' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Bucarest', country: 'Rumanía' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Rumanía' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Varsovia', country: 'Polonia' },
  { code: 'KRK', name: 'Krakow', city: 'Cracovia', country: 'Polonia' },
  { code: 'GDN', name: 'Gdansk', city: 'Gdansk', country: 'Polonia' },
  { code: 'WRO', name: 'Wrocław', city: 'Wrocław', country: 'Polonia' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Praga', country: 'República Checa' },
  { code: 'BRQ', name: 'Brno', city: 'Brno', country: 'República Checa' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungría' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Hungría' },
  
  // América del Norte - Principales Hubs
  { code: 'JFK', name: 'John F. Kennedy International', city: 'Nueva York', country: 'Estados Unidos' },
  { code: 'LGA', name: 'LaGuardia', city: 'Nueva York', country: 'Estados Unidos' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'Nueva York', country: 'Estados Unidos' },
  { code: 'TEB', name: 'Teterboro', city: 'Nueva York', country: 'Estados Unidos' },
  { code: 'HPN', name: 'White Plains', city: 'Nueva York', country: 'Estados Unidos' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Ángeles', country: 'Estados Unidos' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Ángeles', country: 'Estados Unidos' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Ángeles', country: 'Estados Unidos' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Ángeles', country: 'Estados Unidos' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Estados Unidos' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'Estados Unidos' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'Estados Unidos' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Estados Unidos' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'Estados Unidos' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'Estados Unidos' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Estados Unidos' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'Estados Unidos' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'Estados Unidos' },
  
  // Medio Oriente & Hubs de Negocios
  { code: 'DXB', name: 'Dubai International', city: 'Dubái', country: 'Emiratos Árabes Unidos' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubái', country: 'Emiratos Árabes Unidos' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dabi', country: 'Emiratos Árabes Unidos' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Catar' },
  
  // Asia-Pacífico Principales
  { code: 'NRT', name: 'Narita International', city: 'Tokio', country: 'Japón' },
  { code: 'HND', name: 'Haneda', city: 'Tokio', country: 'Japón' },
  { code: 'ICN', name: 'Incheon International', city: 'Seúl', country: 'Corea del Sur' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapur', country: 'Singapur' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  
  // África Popular
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburgo', country: 'Sudáfrica' },
  { code: 'CPT', name: 'Cape Town International', city: 'Ciudad del Cabo', country: 'Sudáfrica' },
  { code: 'CAI', name: 'Cairo International', city: 'El Cairo', country: 'Egipto' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Marruecos' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Marruecos' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'Nueva York', country: 'Estados Unidos' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Ángeles', country: 'Estados Unidos' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Estados Unidos' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Estados Unidos' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Estados Unidos' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubái', country: 'Emiratos Árabes Unidos' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dabi', country: 'Emiratos Árabes Unidos' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Catar' },
];
