-- Database: reviews-zip

DROP TABLE "reviews";

CREATE DATABASE "reviews-zip"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

	CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	rating INTEGER NOT NULL,
	stayDate DATE NOT NULL,
	title TEXT NOT NULL,
	review TEXT NOT NULL,
	postDate DATE NOT NULL,
	author TEXT NOT NULL,
	authorLocation TEXT NOT NULL,
	ownerResponse TEXT,
	listingId INTEGER NOT NULL
);

DROP TABLE "zipcode";

CREATE TABLE zipcode (
	id SERIAL PRIMARY KEY,
	zipcode TEXT NOT NULL,
	listingId INTEGER NOT NULL
);


-- \copy reviews(rating, stayDate, title, review, postDate, author, authorLocation, ownerResponse, listingId) FROM '/Volumes/FookDrive/SDC/reviewSeed.csv' WITH DELIMITER ';';

-- \copy zipcode(zipcode, listingid) FROM '/Volumes/FookDrive/SDC/zipcodeSeed.csv' WITH DELIMITER ';';

-- CREATE INDEX listingId ON reviews USING btree (listingId DESC);
-- CREATE INDEX listingIdZip ON zipcode USING btree (listingId DESC);