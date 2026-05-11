# Supabase Setup for BrawlNinja

This directory contains the database schema and migrations for BrawlNinja.

## Migrations

### 001_initial_schema.sql

Creates the core tables for player snapshots, club data, brawler stats, and user accounts.

**Tables:**

- `players`: Player snapshot history
- `player_brawlers`: Brawler-specific stats per player snapshot
- `clubs`: Club snapshot history
- `brawlers`: Curated brawler metadata
- `brawler_mode_stats`: Mode-specific win rates and performance
- `team_win_rates`: Pre-computed team synergy data
- `users`: User accounts for favorites and alerts
- `user_favorites`: Saved player and club tags
- `user_alerts`: Trophy milestone and progression alerts

## Deployment

1. Create a Supabase project at https://supabase.com
2. In the Supabase dashboard, go to SQL Editor
3. Copy and paste the contents of `migrations/001_initial_schema.sql`
4. Execute the SQL to create the schema

## Seeding

After creating the schema, you'll need to seed the `brawlers` and `brawler_mode_stats` tables with official Brawl Stars data. See the seed scripts folder for details.

## Environment Variables

After setting up Supabase, add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
