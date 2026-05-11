import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Player } from "@/types";
import { borderRadius, colors, shadows, spacing } from "@/styles/tokens";
import { formatTrophies } from "@/lib/utils";

interface PlayerCardProps {
    player: Player;
    onClick?: () => void;
}

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const clubName = player.clubName || player.club?.name;
    const clubRole = player.clubRole || (player.club ? "Club" : "");

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, scale: 0.98, y: 10 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                },
            );
        }
    }, [player.tag]);

    return (
        <div
            ref={cardRef}
            style={{
                ...styles.card,
                cursor: onClick ? "pointer" : "default",
            }}
            className="ui-card"
            onClick={onClick}
            role={onClick ? "button" : undefined}
        >
            <div style={styles.header}>
                <h3 style={styles.name}>{player.name}</h3>
                <span style={styles.tag}>#{player.tag}</span>
            </div>

            <div style={styles.stats}>
                <div style={styles.stat}>
                    <span style={styles.label}>Trophies</span>
                    <span style={styles.value}>
                        {formatTrophies(player.trophies)}
                    </span>
                </div>
                <div style={styles.stat}>
                    <span style={styles.label}>High Trophies</span>
                    <span style={styles.value}>
                        {formatTrophies(player.highTrophies)}
                    </span>
                </div>
                <div style={styles.stat}>
                    <span style={styles.label}>Brawlers</span>
                    <span style={styles.value}>{player.totalBrawlers}</span>
                </div>
                <div style={styles.stat}>
                    <span style={styles.label}>EXP Level</span>
                    <span style={styles.value}>{player.expLevel}</span>
                </div>
            </div>

            {clubName && (
                <div style={styles.club}>
                    <span style={styles.clubName}>{clubName}</span>
                    {clubRole && (
                        <span style={styles.clubRole}>{clubRole}</span>
                    )}
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        backgroundColor: colors.bgCard,
        borderRadius: borderRadius.lg,
        padding: spacing["6"],
        transition: "transform 0.2s ease, border-color 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: spacing["5"],
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingBottom: spacing["4"],
    },
    name: {
        fontSize: "20px",
        fontWeight: 600,
        color: colors.text,
    },
    tag: {
        fontSize: "13px",
        color: colors.textMuted,
        fontFamily: "'JetBrains Mono', monospace",
        backgroundColor: colors.bgHover,
        padding: "2px 6px",
        borderRadius: borderRadius.sm,
    },
    stats: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: spacing["5"],
    },
    stat: {
        display: "flex",
        flexDirection: "column",
        gap: spacing["1"],
    },
    label: {
        fontSize: "12px",
        color: colors.textMuted,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    value: {
        fontSize: "24px",
        fontWeight: 700,
        color: colors.text,
        fontFamily: "'JetBrains Mono', monospace",
    },
    club: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: spacing["4"],
        backgroundColor: colors.bgAlt,
        borderRadius: borderRadius.base,
        fontSize: "14px",
        boxShadow: shadows.input,
    },
    clubName: {
        fontWeight: 600,
        color: colors.text,
    },
    clubRole: {
        color: colors.textMuted,
        fontSize: "13px",
    },
};
