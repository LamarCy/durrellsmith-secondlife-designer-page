import React, { useEffect, useState } from "react";
import { NAV } from "@/constants/testIds";

const links = [
    { label: "Work", href: "#work", id: NAV.work },
    { label: "Topics", href: "#topics", id: NAV.topics },
    { label: "About", href: "#about", id: NAV.about },
    { label: "Contact", href: "#contact", id: NAV.contact },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[rgba(249,239,222,0.78)] backdrop-blur-xl border-b border-ink/10"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                <a
                    href="#top"
                    data-testid={NAV.logo}
                    className="group flex items-center gap-3"
                >
                    <span className="w-2 h-2 rounded-full bg-rust pulse-dot" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
                        Second Life
                        <span className="text-rust">/</span>Software
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            data-testid={l.id}
                            className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft hover:text-ink transition-colors"
                        >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-rust">
                                [
                            </span>
                            <span className="px-1">{l.label}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-rust">
                                ]
                            </span>
                        </a>
                    ))}
                </nav>

                <button
                    data-testid={NAV.subscribe}
                    onClick={() =>
                        document
                            .getElementById("subscribe")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group flex items-center gap-2 px-5 py-2.5 bg-ink text-cream hover:bg-rust transition-colors duration-300 font-mono text-[10px] uppercase tracking-[0.22em]"
                >
                    <span>Subscribe</span>
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">
                        →
                    </span>
                </button>
            </div>
        </header>
    );
}
