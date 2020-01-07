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

-- PG Commands
-- \copy reviews(rating, stayDate, title, review, postDate, author, authorLocation, ownerResponse, listingId) FROM '/Volumes/FookDrive/SDC/reviewSeed.csv' WITH DELIMITER ';';
-- Seed Instance location: /home/ubuntu/service/seed/reviewSeed.csv
-- Seed Instance location: /home/ubuntu/service/seed/zipcodeSeed.csv

-- \copy zipcode(zipcode, listingid) FROM '/Volumes/FookDrive/SDC/zipcodeSeed.csv' WITH DELIMITER ';';

-- CREATE INDEX listingId ON reviews USING btree (listingId DESC);
-- CREATE INDEX listingIdZip ON zipcode USING btree (listingId DESC);





-- Mongo Commands
-- mongoimport --db=reviewsZip --collection=zipcode --type=csv --columnsHaveTypes --fields="zipcode.string(),listingid.int64()" --file=/Volumes/FookDrive/SDC/mongoZipcodeSeed.csv

-- mongoimport --db=reviewsZip --collection=reviews --type=csv --columnsHaveTypes --fields="rating.int32(),stayDate.string(),title.string(),review.string(),postDate.string(),author.string(),authorLocation.string(),ownerResponse.string(),listingId.int64()" --file=/Volumes/FookDrive/SDC/mongoReviewsSeed.csv