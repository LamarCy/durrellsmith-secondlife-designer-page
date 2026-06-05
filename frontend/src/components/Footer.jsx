import React from "react";
import { FOOTER } from "@/constants/testIds";

const socials = [
    { label: "YouTube", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Email", href: "mailto:durrell@secondlifesoftware.com" },
];

export default function Footer() {
    return (
        <footer
            data-testid={FOOTER.root}
            className="relative max-w-screen-2xl mx-auto px-6 md:px-12 pt-10 pb-10"
        >
            {/* Wordmark — kept small to match the nav typography */}
            <div className="border-t border-ink/15 pt-6 pb-6">
                <div className="font-mono text-ink uppercase tracking-[0.28em] text-sm">
                    second life software.
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                <div>
                    <div className="text-ink/45 mb-3">Index</div>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#work"
                                className="hover:text-rust transition-colors"
                            >
                                Work
                            </a>
                        </li>
                        <li>
                            <a
                                href="#subscribe"
                                className="hover:text-rust transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="text-ink/45 mb-3">Elsewhere</div>
                    <ul className="space-y-2">
                        {socials.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    className="hover:text-rust transition-colors"
                                >
                                    {s.label} →
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="text-ink/45 mb-3">Studio</div>
                    <p className="leading-relaxed normal-case tracking-normal font-sans text-xs text-ink-soft">
                        Durrell Smith is based in Atlanta, working
                        everywhere.
                    </p>
                </div>
                <div>
                    <div className="text-ink/45 mb-3">Colophon</div>
                    <p className="leading-relaxed normal-case tracking-normal font-sans text-xs text-ink-soft">
                        Set in JetBrains Mono. Particle portrait rendered
                        live in WebGL.
                    </p>
                </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                <span>© 2026 Second Life Software</span>
                <span>
                    Made by{" "}
                    <span className="text-ink">Second Life Software</span>{" "}
                    using <span className="text-rust">Emergent</span>.
                </span>
            </div>
        </footer>
    );
}
