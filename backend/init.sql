-- PostgreSQL Database Schema for USA Sevens Stats

-- 1. Players Table
CREATE TABLE IF NOT EXISTS players (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    dob VARCHAR(50),
    team VARCHAR(100),
    format VARCHAR(100),
    position VARCHAR(100),
    hometown VARCHAR(255),
    hometown_state VARCHAR(50),
    nationality VARCHAR(100),
    height VARCHAR(50),
    weight VARCHAR(50),
    club VARCHAR(255),
    college VARCHAR(255),
    debut TEXT,
    national_years VARCHAR(100),
    caps INT,
    tries INT,
    points INT,
    fifteens_caps INT,
    olympic_games TEXT,
    is_olympian BOOLEAN DEFAULT FALSE,
    olympic_editions TEXT[],
    world_cup_sevens VARCHAR(255),
    achievements TEXT,
    biography TEXT,
    image_url TEXT,
    image_alt TEXT,
    source_url TEXT,
    source_notes TEXT,
    data_status VARCHAR(100),
    last_checked VARCHAR(50),
    raw_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sources Table
CREATE TABLE IF NOT EXISTS sources (
    id SERIAL PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_players_slug ON players(slug);
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team);
CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);
CREATE INDEX IF NOT EXISTS idx_players_college ON players(college);
CREATE INDEX IF NOT EXISTS idx_players_is_olympian ON players(is_olympian);
CREATE INDEX IF NOT EXISTS idx_players_hometown_state ON players(hometown_state);
