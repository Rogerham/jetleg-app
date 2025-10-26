import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europa - Wichtigste und Regionale
  { code: 'BRU', name: 'Brussels Airport', city: 'Brüssel', country: 'Belgien', aliases: ['Brussels', 'Brussel'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgien' },
  { code: 'ANR', name: 'Antwerp International', city: 'Antwerpen', country: 'Belgien' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Niederlande', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Niederlande' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Niederlande' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Niederlande' },
  
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'Frankreich', aliases: ['Roissy'] },
  { code: 'ORY', name: 'Orly', city: 'Paris', country: 'Frankreich' },
  { code: 'LBG', name: 'Le Bourget', city: 'Paris', country: 'Frankreich' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nizza', country: 'Frankreich', aliases: ['Cannes'] },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lyon', country: 'Frankreich' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marseille', country: 'Frankreich' },
  { code: 'TLS', name: 'Toulouse Blagnac', city: 'Toulouse', country: 'Frankreich' },
  { code: 'BOD', name: 'Bordeaux Mérignac', city: 'Bordeaux', country: 'Frankreich' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'Frankreich' },
  { code: 'SXB', name: 'Strasbourg', city: 'Straßburg', country: 'Frankreich' },
  { code: 'CFE', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'Frankreich' },
  { code: 'BIA', name: 'Bastia Poretta', city: 'Bastia', country: 'Frankreich' },
  
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'LGW', name: 'Gatwick', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'STN', name: 'Stansted', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'LTN', name: 'Luton', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'LCY', name: 'London City', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'FAB', name: 'Farnborough', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'London', country: 'Vereinigtes Königreich' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'Vereinigtes Königreich' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Vereinigtes Königreich' },
  { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh', country: 'Vereinigtes Königreich' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Vereinigtes Königreich' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Deutschland' },
  { code: 'MUC', name: 'Munich Airport', city: 'München', country: 'Deutschland', aliases: ['Munich'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Deutschland' },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburg', country: 'Deutschland' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Deutschland' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Köln', country: 'Deutschland' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Deutschland' },
  { code: 'NUE', name: 'Nuremberg', city: 'Nürnberg', country: 'Deutschland' },
  { code: 'HAN', name: 'Hannover', city: 'Hannover', country: 'Deutschland' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zürich', country: 'Schweiz' },
  { code: 'GVA', name: 'Geneva', city: 'Genf', country: 'Schweiz', aliases: ['Genève'] },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Basel', country: 'Schweiz' },
  { code: 'BRN', name: 'Bern Airport', city: 'Bern', country: 'Schweiz' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Wien', country: 'Österreich', aliases: ['Vienna'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salzburg', country: 'Österreich' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Österreich' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Österreich' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Mailand', country: 'Italien', aliases: ['Milan'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Mailand', country: 'Italien' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Mailand', country: 'Italien' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rom', country: 'Italien', aliases: ['Rome'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Rom', country: 'Italien' },
  { code: 'NAP', name: 'Naples', city: 'Neapel', country: 'Italien', aliases: ['Naples'] },
  { code: 'FLR', name: 'Florence', city: 'Florenz', country: 'Italien', aliases: ['Florence'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venedig', country: 'Italien', aliases: ['Venice'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venedig', country: 'Italien' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologna', country: 'Italien' },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italien' },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italien' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italien' },
  { code: 'VRN', name: 'Verona', city: 'Verona', country: 'Italien' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'Spanien' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona', country: 'Spanien' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Spanien' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'Spanien' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'Spanien' },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'Spanien' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'Spanien' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Spanien' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'Spanien' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'Spanien' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Teneriffa', country: 'Spanien' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lissabon', country: 'Portugal', aliases: ['Lisbon'] },
  { code: 'OPO', name: 'Porto', city: 'Porto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portugal' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norwegen' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Norwegen' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Norwegen' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Norwegen' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Schweden' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Stockholm', country: 'Schweden' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Göteborg', country: 'Schweden' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Schweden' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Kopenhagen', country: 'Dänemark', aliases: ['Copenhagen'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Dänemark' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Dänemark' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finnland' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finnland' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athen', country: 'Griechenland' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Thessaloniki', country: 'Griechenland' },
  { code: 'HER', name: 'Heraklion', city: 'Heraklion', country: 'Griechenland' },
  { code: 'CFU', name: 'Corfu', city: 'Korfu', country: 'Griechenland' },
  { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Griechenland' },
  { code: 'JTR', name: 'Santorini', city: 'Santorin', country: 'Griechenland' },
  { code: 'RHO', name: 'Rhodes', city: 'Rhodos', country: 'Griechenland' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Bukarest', country: 'Rumänien' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Rumänien' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Warschau', country: 'Polen' },
  { code: 'KRK', name: 'Krakow', city: 'Krakau', country: 'Polen' },
  { code: 'GDN', name: 'Gdansk', city: 'Danzig', country: 'Polen' },
  { code: 'WRO', name: 'Wrocław', city: 'Breslau', country: 'Polen' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Prag', country: 'Tschechien' },
  { code: 'BRQ', name: 'Brno', city: 'Brünn', country: 'Tschechien' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Ungarn' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Ungarn' },
  
  // Nordamerika - Wichtigste Hubs
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Vereinigte Staaten' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'Vereinigte Staaten' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'Vereinigte Staaten' },
  { code: 'TEB', name: 'Teterboro', city: 'New York', country: 'Vereinigte Staaten' },
  { code: 'HPN', name: 'White Plains', city: 'New York', country: 'Vereinigte Staaten' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Vereinigte Staaten' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Angeles', country: 'Vereinigte Staaten' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Angeles', country: 'Vereinigte Staaten' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Angeles', country: 'Vereinigte Staaten' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Vereinigte Staaten' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'Vereinigte Staaten' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'Vereinigte Staaten' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Vereinigte Staaten' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'Vereinigte Staaten' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'Vereinigte Staaten' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Vereinigte Staaten' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'Vereinigte Staaten' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'Vereinigte Staaten' },
  
  // Naher Osten & Geschäftshubs
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Vereinigte Arabische Emirate' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubai', country: 'Vereinigte Arabische Emirate' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Vereinigte Arabische Emirate' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Katar' },
  
  // Asien-Pazifik Wichtigste
  { code: 'NRT', name: 'Narita International', city: 'Tokio', country: 'Japan' },
  { code: 'HND', name: 'Haneda', city: 'Tokio', country: 'Japan' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'Südkorea' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapur', country: 'Singapur' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hongkong', country: 'Hongkong' },
  
  // Afrika Beliebt
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'Südafrika' },
  { code: 'CPT', name: 'Cape Town International', city: 'Kapstadt', country: 'Südafrika' },
  { code: 'CAI', name: 'Cairo International', city: 'Kairo', country: 'Ägypten' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Marokko' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakesch', country: 'Marokko' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'Vereinigte Staaten' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'Vereinigte Staaten' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Vereinigte Staaten' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Vereinigte Staaten' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'Vereinigte Staaten' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'Vereinigte Arabische Emirate' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'Vereinigte Arabische Emirate' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Katar' },
];
