-- Add more international flights to/from America and UAE
INSERT INTO flights (departure_airport, arrival_airport, departure_time, arrival_time, price_per_seat, available_seats, operator, flight_duration, img_destination) VALUES 
-- From Europe to USA
('London (LHR)', 'New York (JFK)', '2024-12-30 09:00:00+00', '2024-12-30 17:30:00+00', 12500, 8, 'TransAtlantic Luxury', '8h 30m', 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&q=80'),
('Paris (CDG)', 'Los Angeles (LAX)', '2024-12-31 11:00:00+00', '2025-01-01 02:15:00+00', 15800, 6, 'Pacific Sky Jets', '11h 15m', 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80'),
('Amsterdam (AMS)', 'Miami (MIA)', '2025-01-02 13:30:00+00', '2025-01-02 23:45:00+00', 13200, 7, 'Caribbean Express', '9h 15m', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80'),
('Frankfurt (FRA)', 'Chicago (ORD)', '2025-01-03 14:00:00+00', '2025-01-03 22:30:00+00', 11900, 8, 'Midwest Aviation', '8h 30m', 'https://images.unsplash.com/photo-1494522358652-f30e61a5de1b?auto=format&fit=crop&q=80'),
('Munich (MUC)', 'San Francisco (SFO)', '2025-01-04 10:30:00+00', '2025-01-05 01:45:00+00', 16500, 6, 'Golden Gate Jets', '11h 15m', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80'),

-- From USA to Europe  
('New York (JFK)', 'London (LHR)', '2025-01-05 20:00:00+00', '2025-01-06 11:30:00+00', 13800, 7, 'Atlantic Bridge', '7h 30m', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80'),
('Los Angeles (LAX)', 'Paris (CDG)', '2025-01-06 16:00:00+00', '2025-01-07 19:15:00+00', 17200, 5, 'Continental Luxury', '11h 15m', 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&q=80'),
('Miami (MIA)', 'Amsterdam (AMS)', '2025-01-07 22:30:00+00', '2025-01-08 17:45:00+00', 14100, 6, 'Dutch Connection', '8h 15m', 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80'),

-- Europe to UAE
('London (LHR)', 'Dubai (DXB)', '2025-01-08 23:15:00+00', '2025-01-09 09:30:00+00', 8900, 8, 'Emirates Sky', '6h 15m', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80'),
('Paris (CDG)', 'Abu Dhabi (AUH)', '2025-01-09 01:30:00+00', '2025-01-09 12:45:00+00', 9200, 7, 'Gulf Luxury Jets', '6h 15m', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80'),
('Frankfurt (FRA)', 'Dubai (DXB)', '2025-01-10 02:00:00+00', '2025-01-10 13:15:00+00', 8600, 8, 'Desert Rose Aviation', '6h 15m', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80'),
('Amsterdam (AMS)', 'Dubai (DXB)', '2025-01-11 22:45:00+00', '2025-01-12 09:00:00+00', 8800, 6, 'Arabian Nights Jets', '6h 15m', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80'),

-- UAE to Europe
('Dubai (DXB)', 'London (LHR)', '2025-01-12 15:30:00+00', '2025-01-12 21:45:00+00', 9400, 7, 'Royal Emirates', '6h 15m', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80'),
('Abu Dhabi (AUH)', 'Paris (CDG)', '2025-01-13 12:00:00+00', '2025-01-13 18:15:00+00', 9600, 6, 'Falcon Premium', '6h 15m', 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&q=80'),
('Dubai (DXB)', 'Frankfurt (FRA)', '2025-01-14 03:45:00+00', '2025-01-14 10:00:00+00', 8700, 8, 'Lufthansa Premium', '6h 15m', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80'),

-- USA domestic and cross routes
('New York (JFK)', 'Los Angeles (LAX)', '2025-01-15 08:00:00+00', '2025-01-15 16:30:00+00', 7800, 8, 'Coast to Coast Jets', '5h 30m', 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80'),
('Los Angeles (LAX)', 'Miami (MIA)', '2025-01-16 14:15:00+00', '2025-01-16 22:45:00+00', 6900, 7, 'Sunshine Express', '4h 30m', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80'),
('Chicago (ORD)', 'San Francisco (SFO)', '2025-01-17 11:30:00+00', '2025-01-17 17:00:00+00', 6200, 8, 'Continental West', '3h 30m', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80'),

-- UAE internal and regional
('Dubai (DXB)', 'Abu Dhabi (AUH)', '2025-01-18 09:15:00+00', '2025-01-18 10:30:00+00', 1200, 6, 'Emirates Shuttle', '1h 15m', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80'),
('Dubai (DXB)', 'Doha (DOH)', '2025-01-19 16:45:00+00', '2025-01-19 18:30:00+00', 2100, 7, 'Gulf Connection', '1h 45m', 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80');