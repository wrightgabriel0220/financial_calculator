DROP TABLE IF EXISTS renters;
DROP TABLE IF EXISTS listings;

CREATE TABLE renters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  hourly_wages NUMERIC(5, 2) NOT NULL,
  hours_working INT NOT NULL,
  dog_count INT,
  cat_count INT
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  rent INT NOT NULL,
  summary TEXT,
  bedrooms INT NOT NULL,
  bathrooms NUMERIC(2, 1) NOT NULL,
  size VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL
);