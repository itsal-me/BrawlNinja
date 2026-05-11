import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import { borderRadius, colors, shadows, spacing } from "@/styles/tokens";

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            );
        }

        if (featuresRef.current) {
            gsap.fromTo(
                featuresRef.current.children,
                { opacity: 0, scale: 0.96, y: 12 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.25,
                },
            );
        }
    }, []);

    const handleSearch = async (tag: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/player/${tag}`);
            if (!response.ok) {
                throw new Error("Player not found");
            }
            router.push(`/${tag}`);
        } catch (err: any) {
            setError(err.message || "Failed to fetch player");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            title="BrawlNinja - Dashboard"
            description="Search player stats and club info"
        >
            <div style={styles.container}>
                <div style={styles.hero} ref={heroRef}>
                    <span style={styles.eyebrow}>Official API data</span>
                    <h1 style={styles.title}>
                        Brawl<span style={styles.titleAccent}>Ninja</span>
                    </h1>
                    <p style={styles.subtitle}>
                        Master Brawl Stars with instant player stats, team
                        recommendations, and analytics.
                    </p>
                </div>

                <div style={styles.searchSection} id="search">
                    <Search
                        onSearch={handleSearch}
                        loading={loading}
                        type="player"
                    />
                </div>

                {error && (
                    <div style={styles.errorBanner} className="ui-surface">
                        {error}
                    </div>
                )}

                <section style={styles.featuresSection}>
                    <div style={styles.features} ref={featuresRef}>
                        <div
                            style={styles.featureCard}
                            className="ui-card feature-card"
                        >
                            <div
                                style={styles.featureIcon}
                                className="feature-icon"
                            >
                                <ChartIcon />
                            </div>
                            <h3 style={styles.featureTitle}>
                                Player Dashboards
                            </h3>
                            <p style={styles.featureDesc}>
                                View detailed player stats, battle logs, and
                                club information.
                            </p>
                        </div>

                        <div
                            style={styles.featureCard}
                            className="ui-card feature-card"
                        >
                            <div
                                style={styles.featureIcon}
                                className="feature-icon"
                            >
                                <SwordsIcon />
                            </div>
                            <h3 style={styles.featureTitle}>Team Builder</h3>
                            <p style={styles.featureDesc}>
                                Get recommended team compositions and counter
                                picks for any mode.
                            </p>
                        </div>

                        <div
                            style={styles.featureCard}
                            className="ui-card feature-card"
                        >
                            <div
                                style={styles.featureIcon}
                                className="feature-icon"
                            >
                                <TrendIcon />
                            </div>
                            <h3 style={styles.featureTitle}>Analytics</h3>
                            <p style={styles.featureDesc}>
                                Track your progress over time with detailed
                                charts and insights.
                            </p>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .feature-card:hover .feature-icon,
                    .feature-card:focus-within .feature-icon {
                        transform: scale(1.05);
                        background-color: ${colors.accent};
                        color: ${colors.text};
                    }

                    .feature-icon {
                        transition:
                            transform 200ms ease,
                            background-color 200ms ease,
                            color 200ms ease;
                    }

                    .cta-primary {
                        transition:
                            transform 200ms ease,
                            box-shadow 200ms ease,
                            background-color 200ms ease;
                    }

                    .cta-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: ${shadows.subtle};
                    }

                    .cta-secondary {
                        transition:
                            transform 200ms ease,
                            color 200ms ease,
                            background-color 200ms ease;
                    }

                    .cta-secondary:hover {
                        transform: translateY(-2px);
                        background-color: ${colors.bgAlt};
                    }
                `}</style>
            </div>
        </Layout>
    );
}

function ChartIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19h16" />
            <path d="M7 17v-6" />
            <path d="M12 17V7" />
            <path d="M17 17v-4" />
        </svg>
    );
}

function SwordsIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 20l6-6" />
            <path d="M9 5l10 10" />
            <path d="M14 4l6 6" />
        </svg>
    );
}

function TrendIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 16l6-6 4 4 6-7" />
            <path d="M14 7h6v6" />
        </svg>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: spacing["12"],
    },
    hero: {
        textAlign: "center",
        maxWidth: "720px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: spacing["3"],
    },
    eyebrow: {
        alignSelf: "center",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: colors.textMuted,
        backgroundColor: colors.bgAlt,
        border: `1px solid ${colors.borderLight}`,
        padding: `6px ${spacing["3"]}`,
        borderRadius: borderRadius.full,
    },
    title: {
        fontSize: "52px",
        fontWeight: 700,
        lineHeight: 1.1,
        color: colors.text,
        letterSpacing: "-0.02em",
    },
    titleAccent: {
        color: colors.accent,
    },
    subtitle: {
        fontSize: "18px",
        color: colors.textMuted,
        lineHeight: 1.6,
    },
    searchSection: {
        maxWidth: "640px",
        margin: "0 auto",
        width: "100%",
    },
    errorBanner: {
        backgroundColor: colors.bgAlt,
        color: colors.error,
        padding: spacing["4"],
        borderRadius: borderRadius.base,
        textAlign: "center",
        maxWidth: "640px",
        margin: "0 auto",
    },
    brandSection: {
        display: "flex",
        flexDirection: "column",
        gap: spacing["6"],
    },
    brandPanel: {
        backgroundColor: colors.bgAlt,
        borderRadius: borderRadius.lg,
        padding: spacing["6"],
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        gap: spacing["6"],
        alignItems: "center",
    },
    brandHeader: {
        display: "flex",
        flexDirection: "column",
        gap: spacing["2"],
    },
    brandTitle: {
        fontSize: "28px",
        fontWeight: 700,
        color: colors.text,
    },
    brandCopy: {
        fontSize: "15px",
        color: colors.textMuted,
        lineHeight: 1.6,
    },
    brandHighlights: {
        display: "flex",
        flexDirection: "column",
        gap: spacing["4"],
    },
    brandItem: {
        backgroundColor: colors.bgCard,
        borderRadius: borderRadius.base,
        padding: spacing["4"],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing["4"],
        boxShadow: shadows.input,
    },
    brandStat: {
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: colors.accent,
    },
    brandItemCopy: {
        fontSize: "14px",
        color: colors.textMuted,
        lineHeight: 1.6,
    },
    featuresSection: {
        padding: 0,
    },
    features: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: spacing["6"],
    },
    featureCard: {
        backgroundColor: colors.bgCard,
        borderRadius: borderRadius.sm,
        padding: spacing["6"],
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: spacing["2"],
        border: `1px solid ${colors.borderStrong}`,
    },
    featureIcon: {
        width: "40px",
        height: "40px",
        borderRadius: borderRadius.base,
        backgroundColor: colors.accentSoft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.text,
    },
    featureTitle: {
        fontSize: "18px",
        fontWeight: 600,
        color: colors.text,
    },
    featureDesc: {
        fontSize: "14px",
        color: colors.textMuted,
        lineHeight: 1.6,
    },
    ctaSection: {
        backgroundColor: colors.bgAlt,
        borderRadius: borderRadius.lg,
        padding: spacing["8"],
        display: "flex",
        flexDirection: "column",
        gap: spacing["5"],
        alignItems: "center",
        textAlign: "center",
    },
    ctaContent: {
        maxWidth: "640px",
        display: "flex",
        flexDirection: "column",
        gap: spacing["2"],
    },
    ctaTitle: {
        fontSize: "26px",
        fontWeight: 700,
        color: colors.text,
    },
    ctaCopy: {
        fontSize: "15px",
        color: colors.textMuted,
        lineHeight: 1.6,
    },
    ctaActions: {
        display: "flex",
        gap: spacing["3"],
        flexWrap: "wrap",
        justifyContent: "center",
    },
    ctaPrimary: {
        backgroundColor: colors.accent,
        color: colors.text,
        padding: `${spacing["3"]} ${spacing["6"]}`,
        borderRadius: borderRadius.base,
        fontWeight: 600,
        fontSize: "14px",
    },
    ctaSecondary: {
        backgroundColor: colors.bgCard,
        color: colors.text,
        padding: `${spacing["3"]} ${spacing["6"]}`,
        borderRadius: borderRadius.base,
        fontWeight: 600,
        fontSize: "14px",
    },
};
