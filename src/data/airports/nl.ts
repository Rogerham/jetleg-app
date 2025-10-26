import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europa - Belangrijkste en Regionale
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussel', country: 'België', aliases: ['Brussels', 'Bruxelles'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'België' },
  { code: 'ANR', name: 'Antwerp International', city: 'Antwerpen', country: 'België' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Nederland', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Nederland' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Nederland' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Nederland' },
  
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Parijs', country: 'Frankrijk', aliases: ['Roissy', 'Paris'] },
  { code: 'ORY', name: 'Orly', city: 'Parijs', country: 'Frankrijk' },
  { code: 'LBG', name: 'Le Bourget', city: 'Parijs', country: 'Frankrijk' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice', country: 'Frankrijk', aliases: ['Cannes'] },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lyon', country: 'Frankrijk' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marseille', country: 'Frankrijk' },
  { code: 'TLS', name: 'Toulouse Blagnac', city: 'Toulouse', country: 'Frankrijk' },
  { code: 'BOD', name: 'Bordeaux Mérignac', city: 'Bordeaux', country: 'Frankrijk' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'Frankrijk' },
  { code: 'SXB', name: 'Strasbourg', city: 'Straatsburg', country: 'Frankrijk' },
  { code: 'CFE', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'Frankrijk' },
  { code: 'BIA', name: 'Bastia Poretta', city: 'Bastia', country: 'Frankrijk' },
  
  { code: 'LHR', name: 'Heathrow', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'LGW', name: 'Gatwick', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'STN', name: 'Stansted', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'LTN', name: 'Luton', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'LCY', name: 'London City', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'FAB', name: 'Farnborough', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'Londen', country: 'Verenigd Koninkrijk' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'Verenigd Koninkrijk' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Verenigd Koninkrijk' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh', country: 'Verenigd Koninkrijk' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Verenigd Koninkrijk' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Duitsland' },
  { code: 'MUC', name: 'Munich Airport', city: 'München', country: 'Duitsland', aliases: ['Munich'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Duitsland' },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburg', country: 'Duitsland' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlijn', country: 'Duitsland' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Keulen', country: 'Duitsland' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Duitsland' },
  { code: 'NUE', name: 'Nuremberg', city: 'Neurenberg', country: 'Duitsland' },
  { code: 'HAN', name: 'Hannover', city: 'Hannover', country: 'Duitsland' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zürich', country: 'Zwitserland' },
  { code: 'GVA', name: 'Geneva', city: 'Genève', country: 'Zwitserland', aliases: ['Genf'] },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Bazel', country: 'Zwitserland' },
  { code: 'BRN', name: 'Bern Airport', city: 'Bern', country: 'Zwitserland' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Wenen', country: 'Oostenrijk', aliases: ['Vienna'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salzburg', country: 'Oostenrijk' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Oostenrijk' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Oostenrijk' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milaan', country: 'Italië', aliases: ['Milan'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Milaan', country: 'Italië' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Milaan', country: 'Italië' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italië', aliases: ['Roma'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Rome', country: 'Italië' },
  { code: 'NAP', name: 'Naples', city: 'Napels', country: 'Italië', aliases: ['Naples'] },
  { code: 'FLR', name: 'Florence', city: 'Florence', country: 'Italië', aliases: ['Firenze'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venetië', country: 'Italië', aliases: ['Venice'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venetië', country: 'Italië' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologna', country: 'Italië' },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italië' },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italië' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italië' },
  { code: 'VRN', name: 'Verona', city: 'Verona', country: 'Italië' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'Spanje' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona', country: 'Spanje' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spanje' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'Spanje' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'Spanje' },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'Spanje' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spanje' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spanje' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'Spanje' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'Spanje' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'Spanje' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lissabon', country: 'Portugal', aliases: ['Lisbon'] },
  { code: 'OPO', name: 'Porto', city: 'Porto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portugal' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Noorwegen' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Noorwegen' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Noorwegen' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Noorwegen' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Zweden' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Stockholm', country: 'Zweden' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Göteborg', country: 'Zweden' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Zweden' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Kopenhagen', country: 'Denemarken', aliases: ['Copenhagen'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Denemarken' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Denemarken' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finland' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finland' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athene', country: 'Griekenland' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Thessaloniki', country: 'Griekenland' },
  { code: 'HER', name: 'Heraklion', city: 'Heraklion', country: 'Griekenland' },
  { code: 'CFU', name: 'Corfu', city: 'Corfu', country: 'Griekenland' },
  { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Griekenland' },
  { code: 'JTR', name: 'Santorini', city: 'Santorini', country: 'Griekenland' },
  { code: 'RHO', name: 'Rhodes', city: 'Rhodos', country: 'Griekenland' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Boekarest', country: 'Roemenië' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Roemenië' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Warschau', country: 'Polen' },
  { code: 'KRK', name: 'Krakow', city: 'Krakau', country: 'Polen' },
  { code: 'GDN', name: 'Gdansk', city: 'Gdansk', country: 'Polen' },
  { code: 'WRO', name: 'Wrocław', city: 'Wrocław', country: 'Polen' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Praag', country: 'Tsjechië' },
  { code: 'BRQ', name: 'Brno', city: 'Brno', country: 'Tsjechië' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Boedapest', country: 'Hongarije' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Hongarije' },
  
  // Noord-Amerika - Belangrijkste Hubs
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Verenigde Staten' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'Verenigde Staten' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'Verenigde Staten' },
  { code: 'TEB', name: 'Teterboro', city: 'New York', country: 'Verenigde Staten' },
  { code: 'HPN', name: 'White Plains', city: 'New York', country: 'Verenigde Staten' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Verenigde Staten' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Angeles', country: 'Verenigde Staten' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Angeles', country: 'Verenigde Staten' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Angeles', country: 'Verenigde Staten' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Verenigde Staten' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'Verenigde Staten' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'Verenigde Staten' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Verenigde Staten' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'Verenigde Staten' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'Verenigde Staten' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Verenigde Staten' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'Verenigde Staten' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'Verenigde Staten' },
  
  // Midden-Oosten & Zakelijke Hubs
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Verenigde Arabische Emiraten' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubai', country: 'Verenigde Arabische Emiraten' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Verenigde Arabische Emiraten' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  
  // Azië Pacific Belangrijkste
  { code: 'NRT', name: 'Narita International', city: 'Tokio', country: 'Japan' },
  { code: 'HND', name: 'Haneda', city: 'Tokio', country: 'Japan' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'Zuid-Korea' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hongkong', country: 'Hongkong' },
  
  // Afrika Populair
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'Zuid-Afrika' },
  { code: 'CPT', name: 'Cape Town International', city: 'Kaapstad', country: 'Zuid-Afrika' },
  { code: 'CAI', name: 'Cairo International', city: 'Caïro', country: 'Egypte' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Marokko' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Marokko' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Verenigde Staten' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Verenigde Staten' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Verenigde Staten' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Verenigde Staten' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Verenigde Staten' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Verenigde Arabische Emiraten' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Verenigde Arabische Emiraten' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
];
