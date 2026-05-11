-- Create tables for BrawlNinja
-- This migration creates the core schema for player snapshots, analytics, and recommendations

-- Players table: stores snapshot history
CREATE TABLE IF NOT EXISTS players (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag TEXT NOT NULL,
  name TEXT,
  trophies INT,
  high_trophies INT,
  exp_level INT,
  power_level INT,
  total_brawlers INT,
  snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tag, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_players_tag ON players(tag);
CREATE INDEX IF NOT EXISTS idx_players_snapshot ON players(snapshot_date);

-- Player brawlers table: brawler-specific stats per snapshot
CREATE TABLE IF NOT EXISTS player_brawlers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  player_id BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  brawler_id INT NOT NULL,
  power INT,
  trophies INT,
  highest_trophies INT,
  star_powers TEXT[],
  gadgets TEXT[],
  snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, brawler_id, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_player_brawlers_player ON player_brawlers(player_id);

-- Clubs table: stores club snapshot history
CREATE TABLE IF NOT EXISTS clubs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag TEXT NOT NULL,
  name TEXT,
  type TEXT,
  description TEXT,
  badge_id INT,
  required_trophies INT,
  members_count INT,
  snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tag, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_clubs_tag ON clubs(tag);
CREATE INDEX IF NOT EXISTS idx_clubs_snapshot ON clubs(snapshot_date);

-- Brawlers table: curated brawler metadata
CREATE TABLE IF NOT EXISTS brawlers (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  rarity TEXT,
  class TEXT,
  description TEXT,
  release_date DATE,
  base_damage INT,
  base_health INT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brawlers_name ON brawlers(name);

-- Brawler mode stats: win rates and performance by mode
CREATE TABLE IF NOT EXISTS brawler_mode_stats (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brawler_id INT NOT NULL REFERENCES brawlers(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,
  map_name TEXT,
  win_rate FLOAT,
  pick_rate FLOAT,
  ban_rate FLOAT,
  average_trophies INT,
  strength_score INT,
  synergy_tags TEXT[],
  counter_tags TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(brawler_id, mode, map_name)
);

CREATE INDEX IF NOT EXISTS idx_brawler_mode_stats_brawler ON brawler_mode_stats(brawler_id);
CREATE INDEX IF NOT EXISTS idx_brawler_mode_stats_mode ON brawler_mode_stats(mode);

-- Team win rates: pre-computed synergy data
CREATE TABLE IF NOT EXISTS team_win_rates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brawler_1_id INT NOT NULL REFERENCES brawlers(id),
  brawler_2_id INT NOT NULL REFERENCES brawlers(id),
  brawler_3_id INT REFERENCES brawlers(id),
  mode TEXT NOT NULL,
  win_rate FLOAT,
  pick_rate FLOAT,
  synergy_score FLOAT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(brawler_1_id, brawler_2_id, brawler_3_id, mode)
);

CREATE INDEX IF NOT EXISTS idx_team_win_rates_brawler ON team_win_rates(brawler_1_id, brawler_2_id);
CREATE INDEX IF NOT EXISTS idx_team_win_rates_mode ON team_win_rates(mode);

-- Users table: user profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT AUTH.UID(),
  player_tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites: saved players and clubs
CREATE TABLE IF NOT EXISTS user_favorites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_tag TEXT,
  club_tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, player_tag, club_tag)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);

-- User alerts: trophy milestones and progression alerts
CREATE TABLE IF NOT EXISTS user_alerts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_tag TEXT NOT NULL,
  alert_type TEXT CHECK (alert_type IN ('trophy_milestone', 'daily_gain', 'ranking')),
  threshold INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_alerts_user ON user_alerts(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can only read their own record"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own record"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_favorites
CREATE POLICY "Users can only see their own favorites"
  ON user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON user_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_alerts
CREATE POLICY "Users can only see their own alerts"
  ON user_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts"
  ON user_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON user_alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts"
  ON user_alerts FOR DELETE
  USING (auth.uid() = user_id);

-- Grant public read access to non-user tables
GRANT SELECT ON players TO anon;
GRANT SELECT ON player_brawlers TO anon;
GRANT SELECT ON clubs TO anon;
GRANT SELECT ON brawlers TO anon;
GRANT SELECT ON brawler_mode_stats TO anon;
GRANT SELECT ON team_win_rates TO anon;
