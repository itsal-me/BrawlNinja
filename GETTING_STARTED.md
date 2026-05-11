# Getting Started with BrawlNinja

## Step 1: Prerequisites

Make sure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- A **Supabase account** (https://supabase.com)
- A **Brawl Stars API token** (https://developer.brawlstars.com)

## Step 2: Clone or Download the Project

```bash
cd e:\brawlninjav0.1
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Set Up Supabase

1. Create a new project on https://supabase.com
2. In the Supabase dashboard, go to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Execute the SQL to create the schema
5. Note your project URL and API keys

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

2. Fill in the variables in `.env.local`:

    ```
    NEXT_PUBLIC_BRAWL_STARS_API_URL=https://api.brawlstars.com/v1
    BRAWL_STARS_API_TOKEN=your_token_here
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

    Get your Supabase keys from:
    - Go to your Supabase project dashboard
    - Click **Settings** → **API**
    - Copy the URL and keys

## Step 6: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Test the App

1. Go to the dashboard (home page)
2. Search for a valid Brawl Stars player tag (e.g., `2P88JL8J`)
3. You should see the player's stats and brawler information

## Next Steps

- **Implement analytics**: Add snapshot ingestion and historical data processing
- **Build team builder**: Implement recommendation engine with synergy scoring
- **Add charts**: Use Recharts to visualize trophy trends and win rates
- **Setup database seeding**: Populate brawlers and mode stats with official data
- **Add authentication**: Implement optional login for favorites and alerts

## Project Structure

```
brawlninja/
├── src/
│   ├── components/       # Reusable UI components (Layout, Search, PlayerCard, etc.)
│   ├── pages/            # Next.js pages and API routes
│   │   ├── index.tsx     # Dashboard / home page
│   │   ├── [tag].tsx     # Dynamic player page
│   │   ├── team-builder.tsx
│   │   └── api/          # API route handlers
│   ├── lib/              # Utilities and API clients
│   │   ├── brawlStarsAPI.ts   # Brawl Stars API client
│   │   ├── supabase.ts        # Supabase client setup
│   │   └── utils.ts           # Helper functions
│   ├── styles/           # Design tokens and global styles
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks (coming soon)
├── supabase/
│   ├── migrations/       # Database migration files
│   └── README.md         # Supabase setup instructions
├── public/               # Static assets
├── SYSTEM_DESIGN.md      # Detailed system architecture
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── README.md             # Project overview
```

## Troubleshooting

**"Player not found"**

- Make sure you're using a valid Brawl Stars player tag
- Tags are case-insensitive but should not include the # symbol
- Example valid tag: `2P88JL8J` or `2p88jl8j`

**"API Token Invalid"**

- Verify your Brawl Stars API token in `.env.local`
- Get a new token from https://developer.brawlstars.com

**"Supabase Connection Failed"**

- Check your NEXT_PUBLIC_SUPABASE_URL and API keys
- Make sure your Supabase project is active
- Verify you've run the migration SQL

## Resources

- [Brawl Stars API Documentation](https://developer.brawlstars.com/#/documentation)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

If you encounter issues:

1. Check the console output for error messages
2. Verify all environment variables are correct
3. Check the Brawl Stars API status at https://developer.brawlstars.com
4. Review the SYSTEM_DESIGN.md for architecture details
