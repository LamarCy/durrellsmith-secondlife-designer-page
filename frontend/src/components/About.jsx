import React from "react";

export default function About() {
    return (
        <section
            id="about"
            className="relative max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-ink/15"
        >
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
                <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-6">
                        (03) — About
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ink leading-[0.95]">
                        Came through a
                        <br />
                        <span className="italic text-rust-deep">
                            side door
                        </span>
                        <span className="text-rust">.</span>
                    </h2>
                </div>
                <p className="font-sans text-sm text-ink-soft max-w-xs leading-relaxed md:text-right md:self-end">
                    Painter, mixed-media artist, blues-rock guitarist —
                    bringing the full grammar of composition to digital
                    product design.
                </p>
            </div>

            {/* Bio body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 md:col-start-3 font-sans text-base md:text-lg text-ink leading-[1.7] space-y-6">
                    <p>
                        Durrell Smith came to UX design the way most good
                        things arrive — through a side door, carrying
                        something unexpected.
                    </p>
                    <p>
                        Before wireframes and user flows, there were
                        canvases and power chords. Formally trained as a
                        painter and mixed media artist, and a lifelong
                        songwriter and guitarist rooted in rock and blues,
                        Durrell spent over a decade building a creative
                        practice where gesture, grit, and feeling were the
                        only real rules. Working in watercolor, India ink,
                        oil, and assemblage — and in the raw, honest
                        language of blues-soaked rock — he learned to read
                        a composition the way a user reads a screen:
                        instinctively, emotionally, and in about three
                        seconds flat.
                    </p>

                    <p className="font-serif italic text-2xl md:text-3xl text-rust-deep leading-snug py-4">
                        That instinct is what he brings to Second Life
                        Software.
                    </p>

                    <p>
                        Durrell approaches UX the way he approaches a blank
                        canvas or a slow blues — with respect for the
                        person on the other side of it. Good design, like
                        good painting or a guitar line that cuts right to
                        the bone, doesn&rsquo;t announce itself. It creates
                        conditions for something to be felt, understood, or
                        discovered. The mark that works is the one you
                        don&rsquo;t notice because it&rsquo;s exactly
                        right. The note that lands is the one that hurt
                        just enough to mean something.
                    </p>
                    <p>
                        His background across visual art and music gives
                        him an uncommon fluency in the full grammar of
                        experience design — visual hierarchy, compositional
                        tension, color and contrast, rhythm, tension and
                        release, and the subtle interplay between
                        what&rsquo;s present and what&rsquo;s deliberately
                        left out. These aren&rsquo;t soft skills imported
                        from another field. They&rsquo;re the same tools,
                        applied to a new surface.
                    </p>
                    <p>
                        At Second Life Software, Durrell is focused on
                        bringing that same rigor and raw intuition to
                        digital experiences that are not only functional,
                        but worth returning to.
                    </p>

                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft pt-6 border-t border-ink/15 mt-10">
                        He is based in the studio. He is still painting.
                        He is still playing.
                    </p>
                </div>
            </div>
        </section>
    );
}
