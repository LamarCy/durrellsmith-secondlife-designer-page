import React from "react";
import { WORK } from "@/constants/testIds";

const projects = [
    {
        i: "01",
        title: "Untitled Field Recordings",
        client: "Solo / Editorial",
        year: "2025",
        tags: ["Identity", "Print"],
        img: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=1600&q=80",
        span: "md:col-span-8 md:row-span-2",
        aspect: "aspect-[4/5] md:aspect-auto md:h-full",
    },
    {
        i: "02",
        title: "Brittle Star — Vinyl",
        client: "Mosaic Records",
        year: "2024",
        tags: ["Packaging"],
        img: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=1200&q=80",
        span: "md:col-span-4",
        aspect: "aspect-square",
    },
    {
        i: "03",
        title: "Kiln & Clay",
        client: "Studio Goods",
        year: "2024",
        tags: ["Web", "Brand"],
        img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
        span: "md:col-span-4",
        aspect: "aspect-square",
    },
    {
        i: "04",
        title: "Quiet Engines",
        client: "Second Life Software",
        year: "2025",
        tags: ["Product", "Motion"],
        img: "https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=1600&q=80",
        span: "md:col-span-6",
        aspect: "aspect-[5/4]",
    },
    {
        i: "05",
        title: "After the Drought",
        client: "Editorial Series",
        year: "2024",
        tags: ["Illustration"],
        img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1600&q=80",
        span: "md:col-span-6",
        aspect: "aspect-[5/4]",
    },
    {
        i: "06",
        title: "Lone Pine Letter",
        client: "Newsletter / Self",
        year: "Ongoing",
        tags: ["Editorial", "Web"],
        img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80",
        span: "md:col-span-12",
        aspect: "aspect-[16/7]",
    },
];

export default function WorkShowcase() {
    return (
        <section
            id="work"
            data-testid={WORK.section}
            className="relative max-w-screen-2xl mx-auto px-6 md:px-12 py-24 md:py-40"
        >
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24 border-t border-ink/15 pt-10">
                <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-6">
                        (02) — Selected Work
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ink leading-[0.95]">
                        Things made,
                        <br />
                        mostly with{" "}
                        <span className="italic text-rust-deep">care</span>.
                    </h2>
                </div>
                <p className="font-sans text-sm text-ink-soft max-w-xs leading-relaxed md:text-right md:self-end">
                    A rotating set of recent commissions and personal
                    studies — identities, editorial, product, the occasional
                    record sleeve.
                </p>
            </div>

            {/* Asymmetric bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
                {projects.map((p, idx) => (
                    <a
                        key={p.i}
                        href="#"
                        data-testid={WORK.item(idx)}
                        onClick={(e) => e.preventDefault()}
                        className={`group relative overflow-hidden bg-sand-deep block ${p.span}`}
                    >
                        <div
                            className={`relative w-full ${p.aspect} overflow-hidden`}
                        >
                            <img
                                src={p.img}
                                alt={p.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                            />
                            {/* warm overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rust/0 via-rust/0 to-ink/30 mix-blend-multiply opacity-60" />
                            <div className="absolute inset-0 bg-rust/0 group-hover:bg-rust/15 transition-colors duration-500" />

                            {/* Meta row */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-cream/90">
                                <span>({p.i})</span>
                                <span>{p.year}</span>
                            </div>

                            {/* Title slab */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                                <div className="overflow-hidden">
                                    <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-cream leading-[0.95] translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                        {p.title}
                                    </h3>
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/80">
                                    <span>{p.client}</span>
                                    <span className="hidden md:inline">
                                        {p.tags.join(" / ")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Foot row */}
            <div className="mt-16 flex items-center justify-between border-t border-ink/15 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                <span>End / Section 02</span>
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-rust transition-colors"
                >
                    View the archive →
                </a>
            </div>
        </section>
    );
}
