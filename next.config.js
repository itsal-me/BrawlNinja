/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["cdn.brawlstars.dev", "cdn.brawlify.com"],
        unoptimized: false,
        formats: ["image/avif", "image/webp"],
    },
    headers: async () => {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-store, must-revalidate",
                    },
                ],
            },
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },
    redirects: async () => {
        return [];
    },
};

module.exports = nextConfig;
