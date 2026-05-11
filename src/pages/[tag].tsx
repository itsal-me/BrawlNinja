import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import Layout from "@/components/Layout";
import PlayerCard from "@/components/PlayerCard";
import { borderRadius, colors, shadows, spacing } from "@/styles/tokens";
import { Player } from "@/types";

export default function PlayerPage() {
    const router = useRouter();
    const { tag } = router.query;
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tag || typeof tag !== "string") return;

        const fetchPlayer = async () => {
            try {
                const response = await fetch(`/api/player/${tag}`);
                if (!response.ok) throw new Error("Player not found");
                const data = await response.json();
                setPlayer(data.live);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [tag]);

    useEffect(() => {
        if (player && gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.02,
                    ease: "power2.out",
                    delay: 0.2,
                },
            );
        }
    }, [player]);

    if (loading) {
        return (
            <Layout>
                <div style={styles.loading}>Loading...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div style={styles.error}>{error}</div>
            </Layout>
        );
    }

    if (!player) {
        return (
            <Layout>
                <div style={styles.notFound}>Player not found</div>
            </Layout>
        );
    }

    return (
        <Layout
            title={`${player.name} - BrawlNinja`}
            description={`Brawl Stars player stats for ${player.name}`}
        >
            <div style={styles.container}>
                <PlayerCard player={player} />

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        Brawlers ({player.totalBrawlers})
                    </h2>
                    <div style={styles.brawlerGrid} ref={gridRef}>
                        {player.brawlers?.map((brawler) => (
                            <div
                                key={brawler.id}
                                style={styles.brawlerCard}
                                className="ui-card"
                            >
                                <span style={styles.brawlerName}>
                                    {brawler.name}
                                </span>
                                <span style={styles.brawlerTrophies}>
                                    {brawler.trophies} trophies
                                </span>
                                <span style={styles.brawlerPower}>
                                    Power {brawler.power}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: spacing["10"],
    },
    loading: {
        textAlign: "center",
        padding: spacing["12"],
        color: colors.textMuted,
    },
    error: {
        backgroundColor: colors.bgAlt,
        color: colors.error,
        padding: spacing["4"],
        borderRadius: borderRadius.base,
        textAlign: "center",
        boxShadow: shadows.input,
    },
    notFound: {
        textAlign: "center",
        padding: spacing["12"],
        color: colors.textMuted,
    },
    section: {
        backgroundColor: colors.bgAlt,
        borderRadius: borderRadius.lg,
        padding: spacing["6"],
        boxShadow: shadows.subtle,
    },
    sectionTitle: {
        fontSize: "22px",
        fontWeight: 700,
        marginBottom: spacing["6"],
        color: colors.text,
    },
    brawlerGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: spacing["4"],
    },
    brawlerCard: {
        backgroundColor: colors.bgCard,
        borderRadius: borderRadius.base,
        padding: spacing["4"],
        display: "flex",
        flexDirection: "column",
        gap: spacing["2"],
        textAlign: "center",
    },
    brawlerName: {
        fontWeight: 600,
        color: colors.text,
    },
    brawlerTrophies: {
        fontSize: "13px",
        color: colors.textMuted,
    },
    brawlerPower: {
        fontSize: "12px",
        color: colors.accent,
        fontWeight: 500,
    },
};
