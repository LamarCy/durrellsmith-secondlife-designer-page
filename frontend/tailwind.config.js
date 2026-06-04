/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                // Unified site typography — everything renders in JetBrains Mono
                // to match the nav button. The serif/sans aliases are kept so
                // existing utility classes keep working without site-wide edits.
                serif: ["JetBrains Mono", "monospace"],
                mono: ["JetBrains Mono", "monospace"],
                sans: ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                // Desert tokens
                sand: "#F1E6D1",
                "sand-deep": "#EAD9BE",
                cream: "#F9EFDE",
                ink: "#2A1810",
                "ink-soft": "#5E4434",
                clay: "#D68A6E",
                rose: "#E8A094",
                rust: "#C4432C",
                "rust-deep": "#962F1F",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
