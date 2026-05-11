import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { borderRadius, colors, spacing } from "@/styles/tokens";
import { normalizeTag, validateTag } from "@/lib/utils";

interface SearchProps {
    onSearch: (tag: string) => void;
    loading?: boolean;
    type?: "player" | "club";
}

export default function Search({
    onSearch,
    loading = false,
    type = "player",
}: SearchProps) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            );
        }
    }, []);

    useEffect(() => {
        if (error && errorRef.current) {
            gsap.fromTo(
                errorRef.current,
                { opacity: 0, height: 0, y: -5 },
                {
                    opacity: 1,
                    height: "auto",
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                },
            );
        }
    }, [error]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const normalized = normalizeTag(input);
        if (!validateTag(normalized)) {
            setError(
                `Invalid ${type} tag. Use alphanumeric characters (e.g., ABC123).`,
            );
            return;
        }

        onSearch(normalized);
    };

    return (
        <div style={styles.container} ref={containerRef}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup} className="ui-surface">
                    <span style={styles.prefix}>#</span>
                    <input
                        type="text"
                        placeholder={`Enter ${type} tag (e.g., ABC123)`}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                        }}
                        disabled={loading}
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            backgroundColor: loading
                                ? colors.secondaryLight
                                : colors.accent,
                            color: loading ? colors.textMuted : colors.text,
                        }}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
                {error && (
                    <div ref={errorRef} style={styles.error}>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
    },
    form: {
        width: "100%",
    },
    inputGroup: {
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.bgCard,
        borderRadius: borderRadius.sm,
        overflow: "hidden",
        minHeight: "48px",
        border: `1px solid ${colors.border}`,
        transition: "border-color 0.2s ease, background-color 0.2s ease",
    },
    prefix: {
        padding: `${spacing["3"]} ${spacing["3"]}`,
        color: colors.textMuted,
        fontWeight: 600,
        letterSpacing: "0.04em",
    },
    input: {
        flex: 1,
        border: "none",
        backgroundColor: "transparent",
        padding: `${spacing["3"]} ${spacing["2"]}`,
        color: colors.text,
        fontSize: "15px",
        outline: "none",
    },
    button: {
        padding: `${spacing["3"]} ${spacing["6"]}`,
        fontWeight: 600,
        fontSize: "14px",
        letterSpacing: "0.02em",
        cursor: "pointer",
        transition: "background-color 150ms ease, color 150ms ease",
        border: "none",
        borderRadius: borderRadius.sm,
    },
    error: {
        color: colors.error,
        fontSize: "13px",
        marginTop: spacing["2"],
        paddingLeft: spacing["3"],
    },
};
