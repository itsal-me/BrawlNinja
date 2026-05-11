import Layout from "@/components/Layout";
import { colors, spacing } from "@/styles/tokens";

export default function TeamBuilder() {
    return (
        <Layout
            title="Team Builder - BrawlNinja"
            description="Get brawler team recommendations"
        >
            <div style={styles.container}>
                <h1 style={styles.title}>Team Builder</h1>
                <p style={styles.description}>
                    Select a game mode and brawlers to get team composition
                    recommendations.
                </p>

                <div style={styles.placeholder}>
                    <p>Team builder coming soon...</p>
                </div>
            </div>
        </Layout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
    },
    title: {
        fontSize: "32px",
        fontWeight: 700,
        marginBottom: spacing["2"],
        color: colors.accent,
    },
    description: {
        fontSize: "16px",
        color: colors.textMuted,
        marginBottom: spacing["8"],
    },
    placeholder: {
        backgroundColor: colors.bgCard,
        border: `2px dashed ${colors.border}`,
        borderRadius: "8px",
        padding: spacing["12"],
        textAlign: "center",
        color: colors.textMuted,
    },
};
