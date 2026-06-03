import React, { useState } from "react";
import { SUBSCRIBE } from "@/constants/testIds";

export default function SubscribePlaceholder() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // Visual placeholder — no backend write.
        if (!email) return;
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setEmail("");
        }, 2400);
    };

    return (
        <section
            id="subscribe"
            data-testid={SUBSCRIBE.section}
            className="relative max-w-screen-2xl mx-auto px-6 md:px-12 py-32 md:py-48 border-t border-ink/15"
        >
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-10">
                (03) — Newsletter
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-7">
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-[7vw] font-light leading-[0.95] text-ink">
                        So much
                        <br />
                        <span className="italic text-rust-deep">
                            info
                        </span>
                        <span className="text-rust">.</span>
                    </h2>
                    <p className="mt-6 font-sans text-sm md:text-base text-ink-soft max-w-md leading-relaxed">
                        One letter, every other Sunday. Field notes on
                        design, software, and what I'm making. Free,
                        leaving room in your inbox.
                    </p>
                </div>

                <div className="md:col-span-5">
                    <form
                        onSubmit={submit}
                        className="relative"
                        noValidate
                    >
                        <input
                            data-testid={SUBSCRIBE.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL"
                            className="w-full bg-transparent border-b-2 border-ink/40 focus:border-rust outline-none py-4 pr-14 font-mono text-sm md:text-base uppercase tracking-[0.18em] text-ink placeholder:text-ink/35 transition-colors"
                        />
                        <button
                            type="submit"
                            data-testid={SUBSCRIBE.submit}
                            className="absolute right-0 bottom-3 w-11 h-11 rounded-full bg-rust text-cream flex items-center justify-center hover:bg-rust-deep active:scale-95 transition-all"
                            aria-label="Subscribe"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <div className="mt-4 h-5 font-mono text-[10px] uppercase tracking-[0.25em]">
                            {sent ? (
                                <span className="text-rust">
                                    ● On the list. Talk soon.
                                </span>
                            ) : (
                                <span className="text-ink/45">
                                    No spam. Unsubscribe anytime.
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
