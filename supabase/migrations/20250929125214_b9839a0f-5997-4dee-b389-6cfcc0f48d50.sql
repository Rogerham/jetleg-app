-- Add more placeholder flights to provide better search coverage
-- Check current data first
SELECT COUNT(*) as total_flights FROM flights;
SELECT DISTINCT departure_airport FROM flights ORDER BY departure_airport;
SELECT DISTINCT arrival_airport FROM flights ORDER BY arrival_airport;

-- Add more European destinations and routes
INSERT INTO flights (
  departure_airport, arrival_airport, departure_time, arrival_time, 
  price_per_seat, available_seats, operator, flight_duration, jet_id, img_destination
) VALUES
-- Amsterdam departures
('Amsterdam (AMS)', 'Madrid (MAD)', '2024-12-15 08:00:00+00', '2024-12-15 10:30:00+00', 2800, 6, 'SkyJet Europe', '2h 30m', 1, '/images/madrid-aerial.jpg'),
('Amsterdam (AMS)', 'Berlin (BER)', '2024-12-16 14:00:00+00', '2024-12-16 15:15:00+00', 2200, 8, 'EuroFly', '1h 15m', 2, '/images/berlin-aerial.jpg'),
('Amsterdam (AMS)', 'Rome (FCO)', '2024-12-17 10:30:00+00', '2024-12-17 13:00:00+00', 3500, 7, 'Luxury Air', '2h 30m', 3, '/images/rome-aerial.jpg'),
('Amsterdam (AMS)', 'Geneva (GVA)', '2024-12-18 16:00:00+00', '2024-12-18 17:30:00+00', 2900, 5, 'Alpine Jets', '1h 30m', 1, '/images/geneva-aerial.jpg'),

-- Brussels departures
('Brussels (BRU)', 'Nice (NCE)', '2024-12-15 09:15:00+00', '2024-12-15 11:30:00+00', 3200, 6, 'Riviera Air', '2h 15m', 2, '/images/nice-aerial.jpg'),
('Brussels (BRU)', 'Vienna (VIE)', '2024-12-16 13:30:00+00', '2024-12-16 15:45:00+00', 2600, 7, 'Central European Jets', '2h 15m', 3, '/images/vienna-aerial.jpg'),
('Brussels (BRU)', 'Prague (PRG)', '2024-12-17 11:00:00+00', '2024-12-17 12:30:00+00', 2400, 8, 'Bohemian Air', '1h 30m', 1, '/images/prague-aerial.jpg'),

-- Frankfurt departures  
('Frankfurt (FRA)', 'Stockholm (ARN)', '2024-12-15 07:45:00+00', '2024-12-15 09:45:00+00', 2800, 6, 'Nordic Jets', '2h 00m', 2, '/images/stockholm-aerial.jpg'),
('Frankfurt (FRA)', 'Copenhagen (CPH)', '2024-12-16 15:30:00+00', '2024-12-16 16:45:00+00', 2500, 7, 'Scandinavian Air', '1h 15m', 3, '/images/copenhagen-aerial.jpg'),
('Frankfurt (FRA)', 'Oslo (OSL)', '2024-12-17 12:15:00+00', '2024-12-17 14:15:00+00', 3100, 5, 'Fjord Aviation', '2h 00m', 1, '/images/oslo-aerial.jpg'),

-- Munich departures
('Munich (MUC)', 'Barcelona (BCN)', '2024-12-15 10:00:00+00', '2024-12-15 12:15:00+00', 3300, 6, 'Mediterranean Jets', '2h 15m', 2, '/images/barcelona-aerial.jpg'),
('Munich (MUC)', 'Milan (MXP)', '2024-12-16 16:45:00+00', '2024-12-16 17:45:00+00', 2700, 8, 'Alpine Express', '1h 00m', 3, '/images/milan-aerial.jpg'),
('Munich (MUC)', 'Zurich (ZUR)', '2024-12-17 14:30:00+00', '2024-12-17 15:15:00+00', 2200, 7, 'Swiss Mountain Air', '45m', 1, '/images/zurich-aerial.jpg'),

-- Cologne departures
('Cologne (CGN)', 'London Luton (LTN)', '2024-12-15 08:30:00+00', '2024-12-15 09:15:00+00', 2600, 6, 'Channel Express', '1h 15m', 2, '/images/london-aerial.jpg'),
('Cologne (CGN)', 'Edinburgh (EDI)', '2024-12-16 11:45:00+00', '2024-12-16 13:00:00+00', 2900, 5, 'Highland Jets', '1h 45m', 3, '/images/edinburgh-aerial.jpg'),
('Cologne (CGN)', 'Dublin (DUB)', '2024-12-17 15:00:00+00', '2024-12-17 16:30:00+00', 3100, 7, 'Celtic Air', '1h 30m', 1, '/images/dublin-aerial.jpg'),

-- Hamburg departures
('Hamburg (HAM)', 'Helsinki (HEL)', '2024-12-15 13:00:00+00', '2024-12-15 15:30:00+00', 2700, 6, 'Baltic Aviation', '2h 30m', 2, '/images/helsinki-aerial.jpg'),
('Hamburg (HAM)', 'Warsaw (WAW)', '2024-12-16 09:30:00+00', '2024-12-16 11:15:00+00', 2400, 8, 'Eastern European Air', '1h 45m', 3, '/images/warsaw-aerial.jpg'),

-- Düsseldorf departures  
('Düsseldorf (DUS)', 'Lisbon (LIS)', '2024-12-15 11:30:00+00', '2024-12-15 14:15:00+00', 3400, 5, 'Atlantic Jets', '2h 45m', 1, '/images/lisbon-aerial.jpg'),
('Düsseldorf (DUS)', 'Budapest (BUD)', '2024-12-16 17:15:00+00', '2024-12-16 19:00:00+00', 2800, 7, 'Danube Air', '1h 45m', 2, '/images/budapest-aerial.jpg'),

-- Return flights for better coverage
('London Luton (LTN)', 'Cologne (CGN)', '2024-12-15 20:30:00+00', '2024-12-15 23:15:00+00', 2600, 6, 'Channel Express', '1h 15m', 2, '/images/cologne-aerial.jpg'),
('Madrid (MAD)', 'Amsterdam (AMS)', '2024-12-16 18:00:00+00', '2024-12-16 20:30:00+00', 2800, 6, 'SkyJet Europe', '2h 30m', 1, '/images/amsterdam-aerial.jpg'),
('Rome (FCO)', 'Munich (MUC)', '2024-12-17 19:30:00+00', '2024-12-17 22:00:00+00', 3500, 7, 'Luxury Air', '2h 30m', 3, '/images/munich-aerial.jpg'),
('Barcelona (BCN)', 'Frankfurt (FRA)', '2024-12-18 14:45:00+00', '2024-12-18 17:00:00+00', 3300, 6, 'Mediterranean Jets', '2h 15m', 2, '/images/frankfurt-aerial.jpg');

-- Add some weekend flights for better search results
INSERT INTO flights (
  departure_airport, arrival_airport, departure_time, arrival_time, 
  price_per_seat, available_seats, operator, flight_duration, jet_id, img_destination
) VALUES
-- Saturday flights
('Amsterdam (AMS)', 'Monaco (MCM)', '2024-12-21 09:00:00+00', '2024-12-21 11:30:00+00', 4500, 4, 'Monaco Elite', '2h 30m', 3, '/images/monaco-aerial.jpg'),
('Brussels (BRU)', 'St. Moritz (SMV)', '2024-12-21 10:30:00+00', '2024-12-21 12:00:00+00', 3800, 5, 'Alpine Luxury', '1h 30m', 1, '/images/stmoritz-aerial.jpg'),
('Frankfurt (FRA)', 'Venice (VCE)', '2024-12-21 14:00:00+00', '2024-12-21 15:45:00+00', 3600, 6, 'Venetian Airways', '1h 45m', 2, '/images/venice-aerial.jpg'),

-- Sunday flights  
('Munich (MUC)', 'Florence (FLR)', '2024-12-22 11:15:00+00', '2024-12-22 12:45:00+00', 3200, 7, 'Tuscan Jets', '1h 30m', 3, '/images/florence-aerial.jpg'),
('Cologne (CGN)', 'Porto (OPO)', '2024-12-22 15:30:00+00', '2024-12-22 18:00:00+00', 3100, 5, 'Douro Aviation', '2h 30m', 1, '/images/porto-aerial.jpg'),
('Hamburg (HAM)', 'Reykjavik (KEF)', '2024-12-22 12:00:00+00', '2024-12-22 15:30:00+00', 4200, 6, 'Nordic Express', '3h 30m', 2, '/images/reykjavik-aerial.jpg');