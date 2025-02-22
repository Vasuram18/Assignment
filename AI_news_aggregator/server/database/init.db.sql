CREATE DATABASE news_aggregator;

\c news_aggregator;

CREATE TABLE headlines (
    id SERIAL PRIMARY KEY,
    headline TEXT NOT NULL,
    score INT NOT NULL,
    category VARCHAR(50) NOT NULL
);