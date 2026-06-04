import React from "react";
import { WORK } from "@/constants/testIds";

const projects = [
    {
        i: "01",
        title: "Sankofa",
        client: "Mixed Media Assemblage",
        year: "2018",
        tags: ["Assemblage", "Mixed Media"],
        img: "https://dashcreatives.art/images/sankofa.jpg",
        span: "md:col-span-8 md:row-span-2",
        aspect: "aspect-[4/5] md:aspect-auto md:h-full",
    },
    {
        i: "02",
        title: "Palm Springs",
        client: "Watercolor / Ink / Turmeric",
        year: "2025",
        tags: ["Watercolor"],
        img: "https://dashcreatives.art/images/palm-springs.png",
        span: "md:col-span-4",
        aspect: "aspect-square",
    },
    {
        i: "03",
        title: "Ashley 1",
        client: "Oil on Canvas",
        year: "2024",
        tags: ["Oil", "Portrait"],
        img: "https://dashcreatives.art/images/ashley-1.png",
        span: "md:col-span-4",
        aspect: "aspect-square",
    },
    {
        i: "04",
        title: "The Songwriter",
        client: "Watercolor / India Ink",
        year: "2025",
        tags: ["Watercolor", "Ink"],
        img: "https://dashcreatives.art/images/the-songwriter.png",
        span: "md:col-span-6",
        aspect: "aspect-[5/4]",
    },
    {
        i: "05",
        title: "Holy Matrimony",
        client: "Mixed Media Assemblage",
        year: "2018",
        tags: ["Assemblage"],
        img: "https://dashcreatives.art/images/holy-matrimony.jpg",
        span: "md:col-span-6",
        aspect: "aspect-[5/4]",
    },
    {
        i: "06",
        title: "Duende",
        client: "Watercolor",
        year: "2022",
        tags: ["Watercolor"],
        img: "https://dashcreatives.art/images/duende.png",
        span: "md:col-span-12",
        aspect: "aspect-[16/7]",
    },
];

export default function WorkShowcase() {
    return (
        <section
            id="work"
            data-testid={WORK.section}
            className="relative max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24"
        >
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16 border-t border-ink/15 pt-10">
                <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust">
                        (02) — Selected Work
                    </div>
                </div>
                <p className="font-sans text-sm text-ink-soft max-w-xs leading-relaxed md:text-right md:self-end">
                    Two decades of work across watercolor, oil, India ink
                    and mixed media assemblage — portraiture, abstraction
                    and the unruly space between.
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

                            {/* Title slab — hairline border on top matches the nav bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 border-t border-cream/20">
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

        </section>
    );
}
