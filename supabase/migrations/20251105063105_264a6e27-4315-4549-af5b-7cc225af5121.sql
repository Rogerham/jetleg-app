-- Voeg fictieve vluchten toe voor december 2025
-- Vluchten vanuit Antwerpen (ANR)
INSERT INTO flights (departure_airport, arrival_airport, departure_time, arrival_time, flight_duration, operator, price_per_seat, available_seats, jet_id) VALUES
('Antwerp (ANR)', 'London (LHR)', '2025-12-05 07:30:00+00', '2025-12-05 08:20:00+00', '50m', 'BelgianJets', 1850, 6, 1),
('Antwerp (ANR)', 'Paris (CDG)', '2025-12-08 14:15:00+00', '2025-12-08 15:10:00+00', '55m', 'EuroFly', 1650, 7, 2),
('Antwerp (ANR)', 'Nice (NCE)', '2025-12-12 09:45:00+00', '2025-12-12 11:30:00+00', '1h 45m', 'Riviera Air', 3100, 8, 3),
('Antwerp (ANR)', 'Geneva (GVA)', '2025-12-15 16:00:00+00', '2025-12-15 17:30:00+00', '1h 30m', 'Alpine Jets', 2750, 6, 4),
('Antwerp (ANR)', 'Barcelona (BCN)', '2025-12-20 11:20:00+00', '2025-12-20 13:25:00+00', '2h 05m', 'Mediterranean Wings', 3400, 8, 5),
('Antwerp (ANR)', 'Milan (LIN)', '2025-12-22 08:00:00+00', '2025-12-22 09:30:00+00', '1h 30m', 'Luxury Air', 2600, 7, 1),

-- Vluchten vanuit Brussel (BRU)
('Brussels (BRU)', 'London (LHR)', '2025-12-03 06:45:00+00', '2025-12-03 07:30:00+00', '45m', 'SkyJet Europe', 1750, 8, 2),
('Brussels (BRU)', 'Ibiza (IBZ)', '2025-12-06 10:30:00+00', '2025-12-06 12:50:00+00', '2h 20m', 'Island Hoppers', 3650, 6, 3),
('Brussels (BRU)', 'Rome (FCO)', '2025-12-10 15:20:00+00', '2025-12-10 17:25:00+00', '2h 05m', 'Luxury Air', 3350, 7, 4),
('Brussels (BRU)', 'Vienna (VIE)', '2025-12-13 12:00:00+00', '2025-12-13 13:40:00+00', '1h 40m', 'Central European Jets', 2800, 8, 5),
('Brussels (BRU)', 'Zurich (ZRH)', '2025-12-17 07:15:00+00', '2025-12-17 08:30:00+00', '1h 15m', 'Swiss Executive', 2450, 6, 1),
('Brussels (BRU)', 'Copenhagen (CPH)', '2025-12-19 13:45:00+00', '2025-12-19 15:15:00+00', '1h 30m', 'Nordic Air', 2550, 7, 2),
('Brussels (BRU)', 'Lisbon (LIS)', '2025-12-23 09:00:00+00', '2025-12-23 11:45:00+00', '2h 45m', 'Atlantic Jets', 3800, 8, 3),
('Brussels (BRU)', 'Prague (PRG)', '2025-12-27 14:30:00+00', '2025-12-27 16:10:00+00', '1h 40m', 'BohemiaFly', 2650, 6, 4),

-- Vluchten vanuit Parijs (CDG)
('Paris (CDG)', 'Barcelona (BCN)', '2025-12-04 08:30:00+00', '2025-12-04 10:25:00+00', '1h 55m', 'Mediterranean Wings', 3150, 8, 5),
('Paris (CDG)', 'Rome (FCO)', '2025-12-07 16:45:00+00', '2025-12-07 18:50:00+00', '2h 05m', 'Luxury Air', 3400, 7, 1),
('Paris (CDG)', 'London (LHR)', '2025-12-11 11:00:00+00', '2025-12-11 11:50:00+00', '50m', 'Channel Express', 1900, 6, 2),
('Paris (CDG)', 'Geneva (GVA)', '2025-12-16 07:30:00+00', '2025-12-16 08:35:00+00', '1h 05m', 'Alpine Jets', 2200, 8, 3),
('Paris (CDG)', 'Amsterdam (AMS)', '2025-12-21 13:15:00+00', '2025-12-21 14:20:00+00', '1h 05m', 'Benelux Air', 1850, 7, 4),

-- Vluchten vanuit Londen (LHR)
('London (LHR)', 'Nice (NCE)', '2025-12-05 10:00:00+00', '2025-12-05 12:35:00+00', '2h 35m', 'Riviera Air', 3300, 8, 5),
('London (LHR)', 'Milan (LIN)', '2025-12-09 14:20:00+00', '2025-12-09 16:35:00+00', '2h 15m', 'Luxury Air', 3150, 6, 1),
('London (LHR)', 'Dublin (DUB)', '2025-12-14 08:15:00+00', '2025-12-14 09:30:00+00', '1h 15m', 'Celtic Wings', 2100, 7, 2),
('London (LHR)', 'Berlin (BER)', '2025-12-18 12:45:00+00', '2025-12-18 14:35:00+00', '1h 50m', 'EuroFly', 2700, 8, 3),
('London (LHR)', 'Malaga (AGP)', '2025-12-24 09:30:00+00', '2025-12-24 12:45:00+00', '3h 15m', 'Costa del Sol Air', 3900, 6, 4),

-- Vluchten vanuit Amsterdam (AMS)
('Amsterdam (AMS)', 'Vienna (VIE)', '2025-12-02 15:00:00+00', '2025-12-02 16:50:00+00', '1h 50m', 'Central European Jets', 2850, 7, 5),
('Amsterdam (AMS)', 'Edinburgh (EDI)', '2025-12-08 07:45:00+00', '2025-12-08 09:15:00+00', '1h 30m', 'Scottish Skies', 2400, 8, 1),
('Amsterdam (AMS)', 'Stockholm (ARN)', '2025-12-11 13:30:00+00', '2025-12-11 15:30:00+00', '2h 00m', 'Nordic Air', 2950, 6, 2),
('Amsterdam (AMS)', 'Brussels (BRU)', '2025-12-16 10:15:00+00', '2025-12-16 11:00:00+00', '45m', 'Benelux Air', 1550, 7, 3),
('Amsterdam (AMS)', 'Porto (OPO)', '2025-12-26 11:40:00+00', '2025-12-26 14:35:00+00', '2h 55m', 'Atlantic Jets', 3700, 8, 4),

-- Vluchten vanuit andere Europese steden
('Barcelona (BCN)', 'Ibiza (IBZ)', '2025-12-07 12:00:00+00', '2025-12-07 13:00:00+00', '1h 00m', 'Island Hoppers', 2250, 8, 5),
('Munich (MUC)', 'Zurich (ZRH)', '2025-12-10 08:30:00+00', '2025-12-10 09:20:00+00', '50m', 'Swiss Executive', 2050, 6, 1),
('Rome (FCO)', 'Athens (ATH)', '2025-12-12 14:15:00+00', '2025-12-12 16:30:00+00', '2h 15m', 'Mediterranean Wings', 3250, 7, 2),
('Madrid (MAD)', 'Lisbon (LIS)', '2025-12-15 09:45:00+00', '2025-12-15 10:55:00+00', '1h 10m', 'Iberian Air', 2150, 8, 3),
('Vienna (VIE)', 'Prague (PRG)', '2025-12-18 16:20:00+00', '2025-12-18 17:10:00+00', '50m', 'BohemiaFly', 1850, 6, 4),
('Geneva (GVA)', 'Nice (NCE)', '2025-12-21 11:30:00+00', '2025-12-21 12:25:00+00', '55m', 'Riviera Air', 2350, 7, 5),
('Copenhagen (CPH)', 'Oslo (OSL)', '2025-12-28 07:00:00+00', '2025-12-28 08:15:00+00', '1h 15m', 'Scandinavian Jets', 2450, 8, 1);