import { Airport } from './types';

export const extendedWorldwideAirports: Airport[] = [
  // Europe - Principaux et Régionaux
  { code: 'BRU', name: 'Brussels Airport', city: 'Bruxelles', country: 'Belgique', aliases: ['Brussels', 'Brussel'] },
  { code: 'EBBR', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgique' },
  { code: 'ANR', name: 'Antwerp International', city: 'Anvers', country: 'Belgique' },
  
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Pays-Bas', aliases: ['Schiphol'] },
  { code: 'RTM', name: 'Rotterdam The Hague Airport', city: 'Rotterdam', country: 'Pays-Bas' },
  { code: 'EIN', name: 'Eindhoven Airport', city: 'Eindhoven', country: 'Pays-Bas' },
  { code: 'MST', name: 'Maastricht Aachen Airport', city: 'Maastricht', country: 'Pays-Bas' },
  
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
  
  { code: 'LHR', name: 'Heathrow', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'LGW', name: 'Gatwick', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'STN', name: 'Stansted', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'LTN', name: 'Luton', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'LCY', name: 'London City', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'FAB', name: 'Farnborough', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'BQH', name: 'London Biggin Hill', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'Royaume-Uni' },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Royaume-Uni' },
  { code: 'EDI', name: 'Edinburgh', city: 'Édimbourg', country: 'Royaume-Uni' },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Royaume-Uni' },
  
  { code: 'FRA', name: 'Frankfurt am Main', city: 'Francfort', country: 'Allemagne' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Allemagne', aliases: ['München'] },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Allemagne' },
  { code: 'HAM', name: 'Hamburg', city: 'Hambourg', country: 'Allemagne' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Allemagne' },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Cologne', country: 'Allemagne' },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Allemagne' },
  { code: 'NUE', name: 'Nuremberg', city: 'Nuremberg', country: 'Allemagne' },
  { code: 'HAN', name: 'Hannover', city: 'Hanovre', country: 'Allemagne' },
  
  { code: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Suisse' },
  { code: 'GVA', name: 'Geneva', city: 'Genève', country: 'Suisse' },
  { code: 'BSL', name: 'Basel EuroAirport', city: 'Bâle', country: 'Suisse' },
  { code: 'BRN', name: 'Bern Airport', city: 'Berne', country: 'Suisse' },
  
  { code: 'VIE', name: 'Vienna International', city: 'Vienne', country: 'Autriche', aliases: ['Vienna', 'Wien'] },
  { code: 'SZG', name: 'Salzburg Airport', city: 'Salzbourg', country: 'Autriche' },
  { code: 'INN', name: 'Innsbruck Airport', city: 'Innsbruck', country: 'Autriche' },
  { code: 'GRZ', name: 'Graz Airport', city: 'Graz', country: 'Autriche' },
  
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italie', aliases: ['Milano'] },
  { code: 'LIN', name: 'Milan Linate', city: 'Milan', country: 'Italie' },
  { code: 'BGY', name: 'Milan Bergamo', city: 'Milan', country: 'Italie' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italie', aliases: ['Roma'] },
  { code: 'CIA', name: 'Rome Ciampino', city: 'Rome', country: 'Italie' },
  { code: 'NAP', name: 'Naples', city: 'Naples', country: 'Italie', aliases: ['Napoli'] },
  { code: 'FLR', name: 'Florence', city: 'Florence', country: 'Italie', aliases: ['Firenze'] },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venise', country: 'Italie', aliases: ['Venezia'] },
  { code: 'TSF', name: 'Venice Treviso', city: 'Venise', country: 'Italie' },
  { code: 'BLQ', name: 'Bologna', city: 'Bologne', country: 'Italie' },
  { code: 'CTA', name: 'Catania', city: 'Catane', country: 'Italie' },
  { code: 'PMO', name: 'Palermo', city: 'Palerme', country: 'Italie' },
  { code: 'BRI', name: 'Bari', city: 'Bari', country: 'Italie' },
  { code: 'VRN', name: 'Verona', city: 'Vérone', country: 'Italie' },
  
  { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid', country: 'Espagne' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelone', country: 'Espagne' },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'Espagne' },
  { code: 'PMI', name: 'Palma Mallorca', city: 'Palma', country: 'Espagne' },
  { code: 'AGP', name: 'Málaga Costa del Sol', city: 'Málaga', country: 'Espagne' },
  { code: 'SVQ', name: 'Sevilla', city: 'Séville', country: 'Espagne' },
  { code: 'VLC', name: 'Valencia', city: 'Valence', country: 'Espagne' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'Espagne' },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'Espagne' },
  { code: 'LPA', name: 'Las Palmas', city: 'Las Palmas', country: 'Espagne' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'Espagne' },
  
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbonne', country: 'Portugal', aliases: ['Lisboa'] },
  { code: 'OPO', name: 'Porto', city: 'Porto', country: 'Portugal' },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
  { code: 'FNC', name: 'Funchal Madeira', city: 'Funchal', country: 'Portugal' },
  
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norvège' },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Norvège' },
  { code: 'TRD', name: 'Trondheim', city: 'Trondheim', country: 'Norvège' },
  { code: 'SVG', name: 'Stavanger', city: 'Stavanger', country: 'Norvège' },
  
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Suède' },
  { code: 'BMA', name: 'Stockholm Bromma', city: 'Stockholm', country: 'Suède' },
  { code: 'GOT', name: 'Gothenburg Landvetter', city: 'Göteborg', country: 'Suède' },
  { code: 'MMX', name: 'Malmö', city: 'Malmö', country: 'Suède' },
  
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhague', country: 'Danemark', aliases: ['København'] },
  { code: 'AAL', name: 'Aalborg', city: 'Aalborg', country: 'Danemark' },
  { code: 'BLL', name: 'Billund', city: 'Billund', country: 'Danemark' },
  
  { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finlande' },
  { code: 'TMP', name: 'Tampere', city: 'Tampere', country: 'Finlande' },
  
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athènes', country: 'Grèce' },
  { code: 'SKG', name: 'Thessaloniki', city: 'Thessalonique', country: 'Grèce' },
  { code: 'HER', name: 'Heraklion', city: 'Héraklion', country: 'Grèce' },
  { code: 'CFU', name: 'Corfu', city: 'Corfou', country: 'Grèce' },
  { code: 'JMK', name: 'Mykonos', city: 'Mykonos', country: 'Grèce' },
  { code: 'JTR', name: 'Santorini', city: 'Santorin', country: 'Grèce' },
  { code: 'RHO', name: 'Rhodes', city: 'Rhodes', country: 'Grèce' },
  
  { code: 'OTP', name: 'Bucharest Henri Coandă', city: 'Bucarest', country: 'Roumanie' },
  { code: 'CLJ', name: 'Cluj-Napoca', city: 'Cluj-Napoca', country: 'Roumanie' },
  
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Varsovie', country: 'Pologne' },
  { code: 'KRK', name: 'Krakow', city: 'Cracovie', country: 'Pologne' },
  { code: 'GDN', name: 'Gdansk', city: 'Gdansk', country: 'Pologne' },
  { code: 'WRO', name: 'Wrocław', city: 'Wrocław', country: 'Pologne' },
  
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Prague', country: 'République tchèque' },
  { code: 'BRQ', name: 'Brno', city: 'Brno', country: 'République tchèque' },
  
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hongrie' },
  { code: 'DEB', name: 'Debrecen', city: 'Debrecen', country: 'Hongrie' },
  
  // Amérique du Nord - Principaux Hubs
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'États-Unis' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'États-Unis' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'New York', country: 'États-Unis' },
  { code: 'TEB', name: 'Teterboro', city: 'New York', country: 'États-Unis' },
  { code: 'HPN', name: 'White Plains', city: 'New York', country: 'États-Unis' },
  
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'États-Unis' },
  { code: 'VNY', name: 'Van Nuys', city: 'Los Angeles', country: 'États-Unis' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Los Angeles', country: 'États-Unis' },
  { code: 'SNA', name: 'John Wayne Orange County', city: 'Los Angeles', country: 'États-Unis' },
  
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'États-Unis' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'États-Unis' },
  { code: 'FLL', name: 'Fort Lauderdale', city: 'Miami', country: 'États-Unis' },
  
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'États-Unis' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago', country: 'États-Unis' },
  { code: 'PWK', name: 'Chicago Executive', city: 'Chicago', country: 'États-Unis' },
  
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'États-Unis' },
  { code: 'SJC', name: 'San Jose Mineta International', city: 'San Francisco', country: 'États-Unis' },
  { code: 'OAK', name: 'Oakland International', city: 'San Francisco', country: 'États-Unis' },
  
  // Moyen-Orient & Hubs d'affaires
  { code: 'DXB', name: 'Dubai International', city: 'Dubaï', country: 'Émirats arabes unis' },
  { code: 'DWC', name: 'Al Maktoum International', city: 'Dubaï', country: 'Émirats arabes unis' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abou Dabi', country: 'Émirats arabes unis' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  
  // Asie-Pacifique Principaux
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japon' },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Japon' },
  { code: 'ICN', name: 'Incheon International', city: 'Séoul', country: 'Corée du Sud' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapour', country: 'Singapour' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  
  // Afrique Populaire
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'Afrique du Sud' },
  { code: 'CPT', name: 'Cape Town International', city: 'Le Cap', country: 'Afrique du Sud' },
  { code: 'CAI', name: 'Cairo International', city: 'Le Caire', country: 'Égypte' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Maroc' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Maroc' },
];

export const popularAirports = [
  ...extendedWorldwideAirports.slice(0, 25),
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'États-Unis' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'États-Unis' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'États-Unis' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'États-Unis' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'États-Unis' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubaï', country: 'Émirats arabes unis' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abou Dabi', country: 'Émirats arabes unis' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
];
