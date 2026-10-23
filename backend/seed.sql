INSERT INTO Venue (Street, PostalNumber, City, Description, Space, Capacity, PricePerHour, ImageURL) VALUES
('Storgatan 1',        '11129', 'Stockholm', 'Ljust konferensrum med projektor och whiteboard',    40,   20,  500,  'https://images.pexels.com/photos/16585156/pexels-photo-16585156.jpeg'),
('Lillgatan 12',       '41103', 'Göteborg',  'Padelbana inomhus med belysning och omklädningsrum', 200,  4,   300,  'https://images.pexels.com/photos/32474981/pexels-photo-32474981.jpeg'),
('Hamngatan 5',        '21121', 'Malmö',     'Festlokal med bar, kök och dansgolv',                150,  80,  1200, 'https://images.pexels.com/photos/17294774/pexels-photo-17294774.jpeg'),
('Kungsgatan 22',      '75331', 'Uppsala',   DEFAULT,                                                 25,   10,  350,  'https://images.pexels.com/photos/22718136/pexels-photo-22718136.jpeg'),
('Drottninggatan 8',   '70210', 'Örebro',    'Danslokal med spegelvägg och ljudanläggning',        120,  30,  600,  'https://images.pexels.com/photos/1398266/pexels-photo-1398266.jpeg'),
('Östra Hamngatan 14', '41110', 'Göteborg',  'Industriloft med högt i tak, passar events',         90,   40,  900,  'https://images.pexels.com/photos/7031834/pexels-photo-7031834.jpeg'),
('Sveavägen 40',       '11134', 'Stockholm', 'Auditorium med scen, ljud och ljus',                 300,  150, 2500, DEFAULT),
('Norra Storgatan 3',  '58222', 'Linköping', 'Inomhushall för fotboll och andra bollsporter',      1800, 22,  1500, 'https://images.pexels.com/photos/36293742/pexels-photo-36293742.jpeg'),
('Strandvägen 7',      '11456', 'Stockholm', 'Takterrass med utsikt över vattnet',                 110,  50,  1800, 'https://images.pexels.com/photos/1955986/pexels-photo-1955986.jpeg'),
('Kyrkogatan 19',      '90325', 'Umeå',      'Ljudisolerad studio för podcast och inspelning',     18,   5,   400,  DEFAULT);

INSERT INTO Booking (BookingId, VenueId, FirstName, LastName, StartTime, EndTime, Status) VALUES
-- Lokal 1: Konferensrum, Stockholm
('A2B3C4D5', 1,  'Anna',     'Svensson',  '2026-10-02 09:00', '2026-10-02 11:00', TRUE),
('B3C4D5E6', 1,  'Karin',    'Lindqvist', '2026-10-15 13:00', '2026-10-15 16:00', TRUE),
('C4D5E6F7', 1,  'Johan',    'Berg',      '2026-10-28 08:00', '2026-10-28 12:00', FALSE),
('D5E6F7G8', 1,  'Petra',    'Falk',      '2026-11-11 10:00', '2026-11-11 12:00', TRUE),
('E6F7G8H9', 1,  'Samir',    'Haddad',    '2026-12-03 14:00', '2026-12-03 17:00', TRUE),
-- Lokal 2: Padelbana, Göteborg
('F7G8H9J2', 2,  'Erik',     'Nilsson',   '2026-10-06 18:00', '2026-10-06 19:00', TRUE),
('G8H9J2K3', 2,  'Maja',     'Berg',      '2026-10-06 18:00', '2026-10-06 19:00', FALSE),
('H9J2K3M4', 2,  'Oskar',    'Holm',      '2026-10-20 19:00', '2026-10-20 20:30', TRUE),
('J2K3M4N5', 2,  'Tove',     'Ahlberg',   '2026-11-09 17:00', '2026-11-09 18:00', TRUE),
('K3M4N5P6', 2,  'Rasmus',   'Dahl',      '2026-12-07 20:00', '2026-12-07 21:00', TRUE),
-- Lokal 3: Festlokal, Malmö
('M4N5P6Q7', 3,  'Sofia',    'Ek',        '2026-10-17 17:00', '2026-10-17 23:00', TRUE),
('N5P6Q7R8', 3,  'Lars',     'Andersson', '2026-10-31 18:00', '2026-10-31 23:00', TRUE),
('P6Q7R8S9', 3,  'Cecilia',  'Moberg',    '2026-11-14 18:00', '2026-11-14 23:00', TRUE),
('Q7R8S9T2', 3,  'Henrik',   'Alm',       '2026-11-28 17:00', '2026-11-28 22:00', FALSE),
('R8S9T2U3', 3,  'Linnea',   'Sjöberg',   '2026-12-12 18:00', '2026-12-12 23:00', TRUE),
-- Lokal 4: Mötesrum, Uppsala
('S9T2U3V4', 4,  'Emma',     'Johansson', '2026-10-08 10:00', '2026-10-08 12:00', TRUE),
('T2U3V4W5', 4,  'Nils',     'Karlsson',  '2026-10-08 13:00', '2026-10-08 14:00', TRUE),
('U3V4W5X6', 4,  'Alva',     'Månsson',   '2026-11-05 09:00', '2026-11-05 11:00', TRUE),
('V4W5X6Y7', 4,  'Daniel',   'Roos',      '2026-11-25 15:00', '2026-11-25 17:00', FALSE),
('W5X6Y7Z8', 4,  'Ebba',     'Lindgren',  '2026-12-10 10:00', '2026-12-10 12:00', TRUE),
-- Lokal 5: Danslokal, Örebro
('X6Y7Z8A3', 5,  'Elin',     'Persson',   '2026-10-12 18:00', '2026-10-12 20:00', TRUE),
('Y7Z8A3B4', 5,  'Viktor',   'Olsson',    '2026-10-26 18:00', '2026-10-26 20:00', FALSE),
('Z8A3B4C5', 5,  'Moa',      'Engström',  '2026-11-02 18:00', '2026-11-02 20:00', TRUE),
('A3B4C5D6', 5,  'Axel',     'Wallin',    '2026-11-23 19:00', '2026-11-23 21:00', TRUE),
('B4C5D6E7', 5,  'Ida',      'Pettersson','2026-12-14 18:00', '2026-12-14 20:00', TRUE),
-- Lokal 6: Industriloft, Göteborg
('C5D6E7F8', 6,  'Hanna',    'Larsson',   '2026-10-10 12:00', '2026-10-10 18:00', TRUE),
('D6E7F8G9', 6,  'Jonas',    'Blom',      '2026-10-24 14:00', '2026-10-24 22:00', TRUE),
('E7F8G9H2', 6,  'Klara',    'Nyberg',    '2026-11-21 12:00', '2026-11-21 18:00', TRUE),
('F8G9H2J3', 6,  'Mikael',   'Bäck',      '2026-12-05 16:00', '2026-12-05 23:00', FALSE),
('G9H2J3K4', 6,  'Sara',     'Östlund',   '2026-12-19 12:00', '2026-12-19 20:00', TRUE),
-- Lokal 7: Auditorium, Stockholm
('H2J3K4M5', 7,  'Gustav',   'Eriksson',  '2026-10-14 09:00', '2026-10-14 17:00', TRUE),
('J3K4M5N6', 7,  'Amanda',   'Forsberg',  '2026-10-29 09:00', '2026-10-29 12:00', TRUE),
('K4M5N6P7', 7,  'Patrik',   'Sundin',    '2026-11-17 09:00', '2026-11-17 16:00', TRUE),
('M5N6P7Q8', 7,  'Louise',   'Hedberg',   '2026-12-01 10:00', '2026-12-01 15:00', FALSE),
('N6P7Q8R9', 7,  'Stefan',   'Ivarsson',  '2026-12-09 09:00', '2026-12-09 17:00', TRUE),
-- Lokal 8: Inomhushall, Linköping
('P7Q8R9S2', 8,  'Fredrik',  'Sandberg',  '2026-10-07 19:00', '2026-10-07 21:00', TRUE),
('Q8R9S2T3', 8,  'Lena',     'Wikström',  '2026-10-21 19:00', '2026-10-21 21:00', FALSE),
('R9S2T3U4', 8,  'Mattias',  'Fors',      '2026-11-04 20:00', '2026-11-04 22:00', TRUE),
('S2T3U4V5', 8,  'Therese',  'Gran',      '2026-11-18 19:00', '2026-11-18 21:00', TRUE),
('T3U4V5W6', 8,  'Oliver',   'Lund',      '2026-12-15 18:00', '2026-12-15 20:00', TRUE),
-- Lokal 9: Takterrass, Stockholm
('U4V5W6X7', 9,  'Maria',    'Lund',      '2026-10-03 16:00', '2026-10-03 22:00', TRUE),
('V5W6X7Y8', 9,  'Joakim',   'Berglund',  '2026-10-18 15:00', '2026-10-18 21:00', TRUE),
('W6X7Y8Z9', 9,  'Helena',   'Kron',      '2026-11-07 16:00', '2026-11-07 22:00', FALSE),
('X7Y8Z9A2', 9,  'Pontus',   'Edlund',    '2026-11-27 17:00', '2026-11-27 23:00', TRUE),
('Y8Z9A2B3', 9,  'Agnes',    'Holmgren',  '2026-12-20 15:00', '2026-12-20 21:00', TRUE),
-- Lokal 10: Studio, Umeå
('Z9A2B3C4', 10, 'Anders',   'Nyström',   '2026-10-09 10:00', '2026-10-09 12:00', TRUE),
('B2C3D4E5', 10, 'Julia',    'Hedlund',   '2026-10-09 13:00', '2026-10-09 15:00', TRUE),
('C3D4E5F6', 10, 'Malin',    'Dahlberg',  '2026-11-12 11:00', '2026-11-12 13:00', TRUE),
('D4E5F6G7', 10, 'Robin',    'Åkesson',   '2026-11-26 14:00', '2026-11-26 16:00', FALSE),
('E5F6G7H8', 10, 'Frida',    'Lundqvist', '2026-12-17 10:00', '2026-12-17 12:00', TRUE);