CREATE DATABASE IF NOT EXISTS BookingVenue;
USE BookingVenue;
DROP TABLE IF EXISTS Booking;
DROP TABLE IF EXISTS Venue;
DROP TABLE IF EXISTS City;

CREATE TABLE City (
	cityId INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Venue (
	venueId INT PRIMARY KEY AUTO_INCREMENT,
	cityId INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	street VARCHAR(50) NOT NULL,
	postalNumber VARCHAR(5) NOT NULL,
	description VARCHAR(255) DEFAULT 'Den här lokalen har ingen beskrivning ännu.',
	space INT NOT NULL,
	capacity INT NOT NULL,
	pricePerHour INT UNSIGNED NOT NULL,
	imageURL VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/39225128/pexels-photo-39225128.jpeg',
	FOREIGN KEY (cityId) REFERENCES City(cityId)
);

CREATE TABLE Booking (
	bookingId CHAR(8) PRIMARY KEY,
	venueId INT NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	startTime DATETIME NOT NULL,
	endTime DATETIME NOT NULL,
	active BOOL NOT NULL DEFAULT TRUE,
	FOREIGN KEY (venueId) REFERENCES Venue(venueId),
	CHECK (endTime > startTime)
);
