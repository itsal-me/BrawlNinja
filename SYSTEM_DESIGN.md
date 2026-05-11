# BrawlNinja System Design

## Overview

BrawlNinja is a responsive Next.js web app that aggregates Brawl Stars player and club stats, provides team-building recommendations, and tracks analytics. The system treats the official Brawl Stars API as the primary live data source, stores historical snapshots in Supabase for analytics, and surfaces stat pages as publicly shareable landing pages optimized for Discord and social sharing.

---

## Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  Routes: /dashboard | /team-builder | /club | /[tag]       │
│  Components: search, cards, charts, share controls          │
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│                  API Routes (Next.js)                       │
│  /api/player/[tag]     (via Brawl Stars API + DB lookup)   │
│  /api/club/[tag]       (via Brawl Stars API + DB lookup)   │
│  /api/team-builder     (recommendation engine)              │
│  /api/snapshots        (periodic data ingestion job)        │
│  /api/auth             (optional login for favorites/alerts)│
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│                    Supabase (Backend)                       │
│  Tables:                                                     │
│  - players (snapshot history)                               │
│  - clubs (snapshot history)                                 │
│  - brawlers (curated, mode-indexed performance data)        │
│  - team_win_rates (community/official data)                 │
│  - user_favorites (optional login)                          │
│  - user_alerts (optional login)                             │
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│          External Services                                  │
│  Brawl Stars API (live player/club/battle-log data)        │
│  Scheduled snapshots (Supabase scheduled jobs or Vercel)    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**1. Player Lookup**

- User enters a player tag or clicks a link to `/[tag]`.
- Frontend calls `/api/player/[tag]`.
- API route:
    1. Fetches live data from Brawl Stars API (trophies, brawler list, battle logs, recent changes).
    2. Queries Supabase for historical snapshots (last 30 days).
    3. Computes analytics (daily trophy gains, best brawlers, win rate by mode) from stored snapshots.
    4. Returns combined live + historical data.
- Frontend renders dashboard with charts, filters, and share controls.

**2. Team Builder**

- User selects game mode and 1-3 brawlers.
- Frontend calls `/api/team-builder` with mode and selected brawler IDs.
- API route:
    1. Queries `team_win_rates` table for synergy scores and mode-specific performance.
    2. Ranks suggested partners, counters, and presets.
    3. Returns ranked list with win-rate hints.
- Frontend displays recommendations sorted by overall strength.

**3. Periodic Snapshots**

- Scheduled job (hourly at launch) calls a Supabase function or Vercel cron.
- Job:
    1. Queries Supabase for a list of tracked players and clubs (sourced from recent lookups or manual seed list).
    2. Fetches live data from Brawl Stars API for each.
    3. Inserts snapshots into `players` and `clubs` tables with timestamp.
- This populates the historical data used for trending charts and analytics.

**4. Community Win-Rate Data**

- At launch, populate `team_win_rates` and `brawlers` tables with curated official data extracted from the Brawl Stars API or game patch notes.
- Team-builder recommendations use this data to rank suggested brawlers by real-world performance.

---

## Database Schema (Supabase PostgreSQL)

### Table: `players`

Snapshot history for each player.

```sql
CREATE TABLE players (
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

CREATE INDEX idx_players_tag ON players(tag);
CREATE INDEX idx_players_snapshot ON players(snapshot_date);
```

### Table: `player_brawlers`

Brawler-specific stats per snapshot.

```sql
CREATE TABLE player_brawlers (
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

CREATE INDEX idx_player_brawlers_player ON player_brawlers(player_id);
```

### Table: `clubs`

Snapshot history for each club.

```sql
CREATE TABLE clubs (
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

CREATE INDEX idx_clubs_tag ON clubs(tag);
CREATE INDEX idx_clubs_snapshot ON clubs(snapshot_date);
```

### Table: `brawlers`

Curated brawler metadata and mode-specific performance (updated from official data).

```sql
CREATE TABLE brawlers (
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

CREATE INDEX idx_brawlers_name ON brawlers(name);
```

### Table: `brawler_mode_stats`

Curated win-rate and performance data by mode.

```sql
CREATE TABLE brawler_mode_stats (
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

CREATE INDEX idx_brawler_mode_stats_brawler ON brawler_mode_stats(brawler_id);
CREATE INDEX idx_brawler_mode_stats_mode ON brawler_mode_stats(mode);
```

### Table: `team_win_rates`

Pre-computed synergy and win-rate data for brawler combinations.

```sql
CREATE TABLE team_win_rates (
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

CREATE INDEX idx_team_win_rates_brawler ON team_win_rates(brawler_1_id, brawler_2_id);
CREATE INDEX idx_team_win_rates_mode ON team_win_rates(mode);
```

### Table: `users` (optional login)

User profiles for saving favorites and alerts.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT AUTH.UID(),
  player_tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: `user_favorites`

Saved player and club tags.

```sql
CREATE TABLE user_favorites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_tag TEXT,
  club_tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, player_tag, club_tag)
);

CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
```

### Table: `user_alerts`

Alert preferences for trophy milestones and progression.

```sql
CREATE TABLE user_alerts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_tag TEXT NOT NULL,
  alert_type TEXT, -- 'trophy_milestone', 'daily_gain', 'ranking'
  threshold INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_alerts_user ON user_alerts(user_id);
```

---

## API Endpoints

### Public Endpoints

**GET /api/player/[tag]**

- Fetches live player data + historical analytics.
- Response: `{ live: PlayerData, history: Snapshot[], analytics: AnalyticsData }`
- No auth required.

**GET /api/club/[tag]**

- Fetches live club data + member snapshots.
- Response: `{ live: ClubData, members: MemberSnapshot[], analytics: AnalyticsData }`
- No auth required.

**GET /api/team-builder?mode=&brawlers=[]**

- Recommendations based on mode and selected brawlers.
- Response: `{ recommendations: [{ brawler_id, synergy_score, win_rate, reason }], presets: [] }`
- No auth required.

**POST /api/snapshots** (internal/scheduled only)

- Trigger hourly snapshot ingestion.
- Requires internal token or Supabase cron auth.

### Authenticated Endpoints (optional login)

**POST /api/auth/login**

- Supabase magic link or OAuth via Discord.

**POST /api/favorites**

- Add player/club to user's favorites.
- Requires auth token.

**DELETE /api/favorites/[tag]**

- Remove from favorites.
- Requires auth token.

**POST /api/alerts**

- Create trophy milestone or daily gain alert.
- Requires auth token.

---

## UI System

### Color Palette (Dark Ninja/Elite)

```
Primary: #1a1a2e (Deep Navy)
Secondary: #0f3460 (Dark Blue)
Accent: #16c784 (Neon Green) -- highlights, success, CTAs
Accent Alt: #ff6b6b (Neon Red) -- warnings, counters
Neutral: #e0e0e0 (Light Gray) -- text on dark
Background: #0f0f1e (Almost Black)
Card: #1a1a2e
Border: #2d2d44 (Subtle Gray)
```

### Typography

```
Headlines: Inter Bold, 32px, letter-spacing -0.5px
Subheading: Inter Semi-Bold, 20px, letter-spacing -0.2px
Body: Inter Regular, 14px, line-height 1.5
Label: Inter Medium, 12px, letter-spacing 0.5px
Mono (stats): JetBrains Mono, 13px (for large numbers)
```

### Component System

- **Cards**: Minimal border, subtle shadow, rounded corners (4px), padding 16px.
- **Buttons**: Solid accent on dark background, no shadow, 8px border-radius, 12px padding.
- **Charts**: Dark background, neon accent colors for series, minimal grid.
- **Search**: Simple input with icon, no border, underline on focus.
- **Stats Row**: 3-column layout (mobile: 1-column), mono font for numbers, label above.

### Responsive Breakpoints

- **Mobile**: < 640px, single-column, larger touch targets (48px).
- **Tablet**: 640px–1024px, 2-column layouts where appropriate.
- **Desktop**: > 1024px, 3+ column layouts, compact spacing.

### Shareable Stat Pages

- OpenGraph metadata: og:title, og:description, og:image (player card preview), og:url.
- Discord embed preview: 1200x630px preview card showing player name, trophies, top brawlers, and rank.
- Include Discord invite or share button prominently on public pages.

---

## Growth & Monetization Hooks

### User Retention

- **Weekly Insights**: Automated summary of trophy gains, best-performing brawler, and suggested team comps.
- **Streak Badges**: Visual indicators for daily lookups or weekly check-ins.
- **Progress Milestones**: Celebratory notifications at trophy thresholds (5000, 10000, etc.).

### Organic Growth

- **Shareable Stat Pages**: Every player and club page has a dedicated URL with Discord preview and copy-to-clipboard share button.
- **SEO**: Meta tags, structured data (JSON-LD), and a light landing page for search discovery.
- **Discord Embeds**: Rich preview cards when shared in Discord.

### Monetization Pathways

1. **Free Tier (default)**: All dashboards, team builder, snapshots, and analytics.
2. **Ads (phase 2)**: Serve passive ad placements in sidebars or between sections.
3. **Premium Tier (phase 2)**:
    - Advanced filters (time-window comparisons, seasonal stats).
    - Custom team-builder weights and saved comps.
    - Early access to balance patch predictions.
4. **Affiliate Links (phase 2)**: Partner with gear vendors; link affiliate partners in premium profile sections.

---

## Deployment & Hosting

- **Frontend**: Vercel (Next.js native, auto-scaling, serverless functions for API routes).
- **Database**: Supabase (managed PostgreSQL, built-in auth, scheduled functions for snapshots).
- **CDN**: Vercel edge caching for public stat pages.
- **Environment**: Staging on Vercel preview branches, production on main branch.

---

## Initial Milestones

1. **Milestone 1: Foundation** (Week 1-2)
    - Scaffold Next.js + Supabase, set up auth.
    - Implement Brawl Stars API client and basic player lookup.
    - Design and implement dashboard UI.

2. **Milestone 2: Analytics & Team Builder** (Week 3-4)
    - Add snapshot storage and historical data ingestion.
    - Implement team-builder recommendation engine with curated data.
    - Add analytics calculations (trophy trends, best brawlers, win rates by mode).

3. **Milestone 3: Growth & Polish** (Week 5-6)
    - Add shareable stat pages with opengraph metadata.
    - Implement light landing page and SEO improvements.
    - Add Discord sharing hooks and retention features.
    - Hardened testing and API rate-limit handling.

4. **Milestone 4: Launch** (Week 7)
    - Final QA, mobile responsiveness review.
    - Deploy to production.
    - Monitor uptime, API errors, and user feedback.
