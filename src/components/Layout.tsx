import { ReactNode } from "react";
import Head from "next/head";
import {
    borderRadius,
    colors,
    shadows,
    spacing,
    typography,
} from "@/styles/tokens";

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function Layout({
    children,
    title = "BrawlNinja",
    description = "Brawl Stars Stats, Team Builder & Analytics",
}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={styles.container}>
                <header style={styles.header}>
                    <div style={styles.headerContent}>
                        <div style={styles.logoMark}>
                            <img
                                src="/bsNinja.png"
                                alt="BrawlNinja logo"
                                style={styles.logoImage}
                            />
                            <span style={styles.logoText}>
                                Brawl
                                <span style={styles.logoAccent}>Ninja</span>
                            </span>
                        </div>
                        <nav style={styles.nav}>
                            <a
                                href="/"
                                style={styles.navLink}
                                title="Dashboard"
                                aria-label="Dashboard"
                            >
                                <span style={styles.navIcon} aria-hidden>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="8"
                                            height="8"
                                            rx="2"
                                        />
                                        <rect
                                            x="13"
                                            y="3"
                                            width="8"
                                            height="8"
                                            rx="2"
                                        />
                                        <rect
                                            x="3"
                                            y="13"
                                            width="8"
                                            height="8"
                                            rx="2"
                                        />
                                        <rect
                                            x="13"
                                            y="13"
                                            width="8"
                                            height="8"
                                            rx="2"
                                        />
                                    </svg>
                                </span>
                                <span style={styles.srOnly}>Dashboard</span>
                            </a>
                            <a
                                href="/team-builder"
                                style={styles.navLink}
                                title="Team Builder"
                                aria-label="Team Builder"
                            >
                                <span style={styles.navIcon} aria-hidden>
                                    <svg
                                        width="18"
                                        height="18"
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
                                </span>
                                <span style={styles.srOnly}>Team Builder</span>
                            </a>
                            <a
                                href="/team-builder"
                                style={styles.navLink}
                                title="Recommendations"
                                aria-label="Recommendations"
                            >
                                <span style={styles.navIcon} aria-hidden>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 19h16" />
                                        <path d="M7 17V9" />
                                        <path d="M12 17V5" />
                                        <path d="M17 17v-7" />
                                    </svg>
                                </span>
                                <span style={styles.srOnly}>
                                    Recommendations
                                </span>
                            </a>
                        </nav>
                    </div>
                </header>

                <main style={styles.main}>{children}</main>

                <footer style={styles.footer}>
                    <p>
                        BrawlNinja is a fan-made tool for Brawl Stars players.
                        <br />
                        <a
                            href="https://developer.brawlstars.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.footerLink}
                        >
                            Official API Documentation
                        </a>
                    </p>
                </footer>
            </div>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    font-family: ${typography.sansSerif};
                    background-color: ${colors.bg};
                    color: ${colors.text};
                    line-height: ${typography.normal};
                    -webkit-font-smoothing: antialiased;
                    background-image:
                        radial-gradient(
                            circle at 12% 12%,
                            rgba(234, 179, 8, 0.08),
                            transparent 38%
                        ),
                        radial-gradient(
                            circle at 88% 10%,
                            rgba(15, 23, 42, 0.05),
                            transparent 42%
                        );
                    background-attachment: fixed;
                }

                a {
                    color: ${colors.accent};
                    text-decoration: none;
                    transition: color 150ms ease;
                }

                a:hover {
                    color: ${colors.accentBlue};
                }

                header nav a:hover {
                    background-color: ${colors.accentSoft};
                    color: ${colors.text};
                }

                header nav a:focus-visible {
                    outline: 2px solid rgba(234, 179, 8, 0.35);
                    outline-offset: 2px;
                }

                button {
                    font-family: inherit;
                    cursor: pointer;
                    border: none;
                    transition: all 150ms ease;
                    border-radius: ${borderRadius.base};
                }

                .ui-card {
                    box-shadow: none;
                    transition:
                        transform 200ms ease,
                        box-shadow 200ms ease;
                    will-change: transform;
                }

                .ui-card:hover,
                .ui-card:focus-within {
                    transform: translateY(-3px);
                    box-shadow: ${shadows.subtle};
                }

                .ui-surface {
                    box-shadow: none;
                    transition: box-shadow 200ms ease;
                }

                input,
                textarea {
                    font-family: inherit;
                    color: inherit;
                    background-color: ${colors.bgCard};
                    border: 1px solid ${colors.border};
                    padding: ${spacing["2"]} ${spacing["3"]};
                    border-radius: ${borderRadius.base};
                }

                input:focus,
                textarea:focus {
                    outline: 2px solid rgba(234, 179, 8, 0.35);
                    outline-offset: 1px;
                    border-color: ${colors.accent};
                }
            `}</style>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: colors.bg,
    },
    header: {
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        borderBottom: `1px solid ${colors.borderLight}`,
        padding: `${spacing["4"]} 0`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        boxShadow: "none",
    },
    headerContent: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: `0 ${spacing["4"]}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoMark: {
        display: "flex",
        alignItems: "center",
        gap: spacing["3"],
    },
    logoImage: {
        width: "24px",
        height: "24px",
        borderRadius: borderRadius.base,
        objectFit: "cover",
        backgroundColor: colors.bgAlt,
    },
    logoText: {
        fontSize: "22px",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: colors.text,
    },
    logoAccent: {
        color: colors.accent,
    },
    nav: {
        display: "flex",
        gap: spacing["3"],
    },
    navLink: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: borderRadius.base,
        backgroundColor: colors.bgAlt,
        color: colors.text,
        transition: "background-color 150ms ease, color 150ms ease",
    },
    navIcon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    },
    srOnly: {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: 0,
    },
    main: {
        flex: 1,
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        padding: `${spacing["10"]} ${spacing["6"]} ${spacing["12"]}`,
    },
    footer: {
        backgroundColor: colors.bgAlt,
        padding: spacing["8"],
        textAlign: "center",
        fontSize: "13px",
        color: colors.textMuted,
    },
    footerLink: {
        color: colors.accent,
    },
};
