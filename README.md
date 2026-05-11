# BrawlNinja

A responsive web app for Brawl Stars players to view player and club stats, build teams, and track analytics.

## Features

- **Player & Club Dashboards**: Search by tag, view stats, trophies, brawler power levels, and battle logs.
- **Team Builder**: Get brawler recommendations based on mode, synergies, and win-rate data.
- **Analytics**: Track player and club progress over time with trophy trends, daily gains, and mode-specific statistics.
- **Shareable Stat Pages**: Every player page is publicly shareable with Discord preview support.
- **Optional Login**: Save favorites and set up progression alerts without required authentication.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and React 18
- **Backend**: Supabase (PostgreSQL, Auth, Scheduled Functions)
- **API**: Official Brawl Stars API
- **Styling**: Custom CSS with design tokens
- **Charts**: Recharts
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project (https://supabase.com)
- A Brawl Stars API token (https://developer.brawlstars.com)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/brawlninja.git
    cd brawlninja
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file based on `.env.example` and fill in your credentials:

    ```bash
    cp .env.example .env.local
    # Edit .env.local with your API keys
    ```

4. Set up the Supabase database:
    - Run the migrations in `supabase/migrations/` to create tables.
    - Seed the `brawlers` and `brawler_mode_stats` tables with curated data.

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
brawlninja/
├── src/
│   ├── components/       # Shared UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API clients
│   ├── pages/            # Next.js pages and API routes
│   ├── styles/           # Global styles and design tokens
│   ├── types/            # TypeScript type definitions
│   └── app.tsx           # Root component (if using app router)
├── public/               # Static assets
├── supabase/             # Supabase migrations and seed scripts
├── SYSTEM_DESIGN.md      # Detailed system architecture
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

### API Reference

See [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) for complete API endpoint documentation.

## Deployment

Deploy to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brawlninja)

Or manually:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please follow the project's code style and submit pull requests to the `develop` branch.

## License

MIT

## Support

For issues or feature requests, please open an issue on GitHub.

## Official API Reference

Always consult the official Brawl Stars API documentation when implementing features:
https://developer.brawlstars.com/#/documentation
