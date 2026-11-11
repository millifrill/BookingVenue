INSERT INTO City (name) VALUES
('Stockholm'), ('Göteborg'), ('Malmö'), ('Uppsala'), ('Örebro'), ('Linköping'), ('Umeå');

INSERT INTO Venue (cityId, name, street, postalNumber, description, space, capacity, pricePerHour, imageURL) VALUES
(1, 'Konferensrum Ljuset',  'Storgatan 1',        '11129', 'Ljust konferensrum med projektor och whiteboard, perfekt för workshops, möten och presentationer. Lokalen rymmer upp till 20 personer och är enkel att anpassa efter olika upplägg. Här finns allt du behöver för ett effektivt och fokuserat möte.',      40,   20,  500,  'https://images.pexels.com/photos/16585156/pexels-photo-16585156.jpeg'),
(2, 'Padelcenter Göteborg', 'Lillgatan 12',       '41103', 'Padelbana inomhus med belysning och omklädningsrum, så att du kan spela oavsett väder och tid på dygnet. Banan passar fyra spelare och fungerar lika bra för vänmatcher som för träning. Efter matchen kan du i lugn och ro byta om i omklädningsrummet.', 200,  4,   300,  'https://images.pexels.com/photos/32474981/pexels-photo-32474981.jpeg'),
(3, 'Festvåningen Hamnen',  'Hamngatan 5',        '21121', 'Festlokal med bar, kök och dansgolv för upp till 80 gäster. Lokalen passar utmärkt för bröllop, födelsedagar och företagsfester. Med eget kök och egen bar kan du enkelt ordna både mat och dryck på plats.',                                              150,  80,  1200, 'https://images.pexels.com/photos/17294774/pexels-photo-17294774.jpeg'),
(4, 'Mötesplats Uppsala',   'Kungsgatan 22',      '75331', DEFAULT,                                                                                                                                                                                                                                                    25,   10,  350,  'https://images.pexels.com/photos/22718136/pexels-photo-22718136.jpeg'),
(5, 'Dansstudion Rytmen',   'Drottninggatan 8',   '70210', 'Danslokal med spegelvägg och ljudanläggning där upp till 30 personer får gott om utrymme att röra sig. Lokalen passar för danslektioner, repetitioner och workshops. Den rymliga ytan gör det enkelt att öva in koreografi i grupp.',                      120,  30,  600,  'https://images.pexels.com/photos/1398266/pexels-photo-1398266.jpeg'),
(2, 'Loftet Haga',          'Östra Hamngatan 14', '41110', 'Industriloft med högt i tak och en rå, öppen atmosfär som ger varje event en egen karaktär. Lokalen rymmer upp till 40 personer och passar för fester, pop-ups och utställningar. Den stora ytan gör det enkelt att möblera efter eget behov.',            90,   40,  900,  'https://images.pexels.com/photos/7031834/pexels-photo-7031834.jpeg'),
(1, 'Aulan Sveavägen',      'Sveavägen 40',       '11134', 'Auditorium med scen, ljud och ljus för upp till 150 personer. Lokalen passar för konferenser, föreläsningar och konserter. Den professionella tekniken gör att både talare och artister kommer till sin rätt.',                                            300,  150, 2500, DEFAULT),
(6, 'Östgötahallen',        'Norra Storgatan 3',  '58222', 'Inomhushall för fotboll och andra bollsporter med gott om plats för både träning och matcher. Hallen kan användas året runt oavsett väder. Den passar för föreningar, företagsturneringar och privata grupper.',                                           1800, 22,  1500, 'https://images.pexels.com/photos/36293742/pexels-photo-36293742.jpeg'),
(1, 'Takterrassen Strand',  'Strandvägen 7',      '11456', 'Takterrass med utsikt över vattnet, perfekt för afterwork, middagar och sommarfester. Terrassen rymmer upp till 50 gäster och ger en minnesvärd inramning till både firande och nätverkande. Här får varje tillfälle en extra speciell känsla.',           110,  50,  1800, 'https://images.pexels.com/photos/1955986/pexels-photo-1955986.jpeg'),
(7, 'Ljudstudion Norr',     'Kyrkogatan 19',      '90325', DEFAULT,                                                                                                                                                                                                                                                    18,   5,   400,  DEFAULT);

INSERT INTO Booking (bookingId, venueId, firstName, lastName, startTime, endTime) VALUES
-- Lokal 1: Konferensrum, Stockholm
('A2B3C4D5', 1,  'Anna',     'Svensson',  '2026-10-02 09:00', '2026-10-02 11:00'),
('B3C4D5E6', 1,  'Karin',    'Lindqvist', '2026-10-15 13:00', '2026-10-15 16:00'),
('C4D5E6F7', 1,  'Johan',    'Berg',      '2026-10-28 08:00', '2026-10-28 12:00'),
('D5E6F7G8', 1,  'Petra',    'Falk',      '2026-11-11 10:00', '2026-11-11 12:00'),
('E6F7G8H9', 1,  'Samir',    'Haddad',    '2026-12-03 14:00', '2026-12-03 17:00'),
-- Lokal 2: Padelbana, Göteborg
('F7G8H9J2', 2,  'Erik',     'Nilsson',   '2026-10-06 18:00', '2026-10-06 19:00'),
('G8H9J2K3', 2,  'Maja',     'Berg',      '2026-10-06 18:00', '2026-10-06 19:00'),
('H9J2K3M4', 2,  'Oskar',    'Holm',      '2026-10-20 19:00', '2026-10-20 20:30'),
('J2K3M4N5', 2,  'Tove',     'Ahlberg',   '2026-11-09 17:00', '2026-11-09 18:00'),
('K3M4N5P6', 2,  'Rasmus',   'Dahl',      '2026-12-07 20:00', '2026-12-07 21:00'),
-- Lokal 3: Festlokal, Malmö
('M4N5P6Q7', 3,  'Sofia',    'Ek',        '2026-10-17 17:00', '2026-10-17 23:00'),
('N5P6Q7R8', 3,  'Lars',     'Andersson', '2026-10-31 18:00', '2026-10-31 23:00'),
('P6Q7R8S9', 3,  'Cecilia',  'Moberg',    '2026-11-14 18:00', '2026-11-14 23:00'),
('Q7R8S9T2', 3,  'Henrik',   'Alm',       '2026-11-28 17:00', '2026-11-28 22:00'),
('R8S9T2U3', 3,  'Linnea',   'Sjöberg',   '2026-12-12 18:00', '2026-12-12 23:00'),
-- Lokal 4: Mötesrum, Uppsala
('S9T2U3V4', 4,  'Emma',     'Johansson', '2026-10-08 10:00', '2026-10-08 12:00'),
('T2U3V4W5', 4,  'Nils',     'Karlsson',  '2026-10-08 13:00', '2026-10-08 14:00'),
('U3V4W5X6', 4,  'Alva',     'Månsson',   '2026-11-05 09:00', '2026-11-05 11:00'),
('V4W5X6Y7', 4,  'Daniel',   'Roos',      '2026-11-25 15:00', '2026-11-25 17:00'),
('W5X6Y7Z8', 4,  'Ebba',     'Lindgren',  '2026-12-10 10:00', '2026-12-10 12:00'),
-- Lokal 5: Danslokal, Örebro
('X6Y7Z8A3', 5,  'Elin',     'Persson',   '2026-10-12 18:00', '2026-10-12 20:00'),
('Y7Z8A3B4', 5,  'Viktor',   'Olsson',    '2026-10-26 18:00', '2026-10-26 20:00'),
('Z8A3B4C5', 5,  'Moa',      'Engström',  '2026-11-02 18:00', '2026-11-02 20:00'),
('A3B4C5D6', 5,  'Axel',     'Wallin',    '2026-11-23 19:00', '2026-11-23 21:00'),
('B4C5D6E7', 5,  'Ida',      'Pettersson','2026-12-14 18:00', '2026-12-14 20:00'),
-- Lokal 6: Industriloft, Göteborg
('C5D6E7F8', 6,  'Hanna',    'Larsson',   '2026-10-10 12:00', '2026-10-10 18:00'),
('D6E7F8G9', 6,  'Jonas',    'Blom',      '2026-10-24 14:00', '2026-10-24 22:00'),
('E7F8G9H2', 6,  'Klara',    'Nyberg',    '2026-11-21 12:00', '2026-11-21 18:00'),
('F8G9H2J3', 6,  'Mikael',   'Bäck',      '2026-12-05 16:00', '2026-12-05 23:00'),
('G9H2J3K4', 6,  'Sara',     'Östlund',   '2026-12-19 12:00', '2026-12-19 20:00'),
-- Lokal 7: Auditorium, Stockholm
('H2J3K4M5', 7,  'Gustav',   'Eriksson',  '2026-10-14 09:00', '2026-10-14 17:00'),
('J3K4M5N6', 7,  'Amanda',   'Forsberg',  '2026-10-29 09:00', '2026-10-29 12:00'),
('K4M5N6P7', 7,  'Patrik',   'Sundin',    '2026-11-17 09:00', '2026-11-17 16:00'),
('M5N6P7Q8', 7,  'Louise',   'Hedberg',   '2026-12-01 10:00', '2026-12-01 15:00'),
('N6P7Q8R9', 7,  'Stefan',   'Ivarsson',  '2026-12-09 09:00', '2026-12-09 17:00'),
-- Lokal 8: Inomhushall, Linköping
('P7Q8R9S2', 8,  'Fredrik',  'Sandberg',  '2026-10-07 19:00', '2026-10-07 21:00'),
('Q8R9S2T3', 8,  'Lena',     'Wikström',  '2026-10-21 19:00', '2026-10-21 21:00'),
('R9S2T3U4', 8,  'Mattias',  'Fors',      '2026-11-04 20:00', '2026-11-04 22:00'),
('S2T3U4V5', 8,  'Therese',  'Gran',      '2026-11-18 19:00', '2026-11-18 21:00'),
('T3U4V5W6', 8,  'Oliver',   'Lund',      '2026-12-15 18:00', '2026-12-15 20:00'),
-- Lokal 9: Takterrass, Stockholm
('U4V5W6X7', 9,  'Maria',    'Lund',      '2026-10-03 16:00', '2026-10-03 22:00'),
('V5W6X7Y8', 9,  'Joakim',   'Berglund',  '2026-10-18 15:00', '2026-10-18 21:00'),
('W6X7Y8Z9', 9,  'Helena',   'Kron',      '2026-11-07 16:00', '2026-11-07 22:00'),
('X7Y8Z9A2', 9,  'Pontus',   'Edlund',    '2026-11-27 17:00', '2026-11-27 23:00'),
('Y8Z9A2B3', 9,  'Agnes',    'Holmgren',  '2026-12-20 15:00', '2026-12-20 21:00'),
-- Lokal 10: Studio, Umeå
('Z9A2B3C4', 10, 'Anders',   'Nyström',   '2026-10-09 10:00', '2026-10-09 12:00'),
('B2C3D4E5', 10, 'Julia',    'Hedlund',   '2026-10-09 13:00', '2026-10-09 15:00'),
('C3D4E5F6', 10, 'Malin',    'Dahlberg',  '2026-11-12 11:00', '2026-11-12 13:00'),
('D4E5F6G7', 10, 'Robin',    'Åkesson',   '2026-11-26 14:00', '2026-11-26 16:00'),
('E5F6G7H8', 10, 'Frida',    'Lundqvist', '2026-12-17 10:00', '2026-12-17 12:00');

INSERT INTO Amenity (name) VALUES
('WiFi'), ('Projektor'), ('Whiteboard'), ('Ljudanläggning'), ('Bar'),
('Kök'), ('Omklädningsrum'), ('Parkering'), ('Scen'), ('Tillgänglighetsanpassat');

INSERT INTO VenueAmenity (venueId, amenityId) VALUES
(1, 1), (1, 2), (1, 3), (1, 8),            -- Konferensrum Ljuset: WiFi, Projektor, Whiteboard, Parkering
(2, 7), (2, 8),                            -- Padelcenter: Omklädningsrum, Parkering
(3, 4), (3, 5), (3, 6), (3, 10),           -- Festvåningen: Ljudanläggning, Bar, Kök, Tillgänglighetsanpassat
(4, 1), (4, 3),                            -- Mötesplats Uppsala: WiFi, Whiteboard
(5, 4), (5, 7),                            -- Dansstudion: Ljudanläggning, Omklädningsrum
(6, 1), (6, 4), (6, 8),                    -- Loftet Haga: WiFi, Ljudanläggning, Parkering
(7, 1), (7, 2), (7, 4), (7, 9), (7, 10),   -- Aulan Sveavägen: WiFi, Projektor, Ljudanläggning, Scen, Tillgänglighetsanpassat
(8, 7), (8, 8),                            -- Östgötahallen: Omklädningsrum, Parkering
(9, 4), (9, 5), (9, 10),                   -- Takterrassen: Ljudanläggning, Bar, Tillgänglighetsanpassat
(10, 1), (10, 4);                          -- Ljudstudion Norr: WiFi, Ljudanläggning
