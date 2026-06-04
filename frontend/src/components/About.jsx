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
                        Formally trained as a painter and mixed media
                        artist, and a lifelong songwriter and guitarist
                        rooted in rock and blues, Durrell built a creative
                        practice where gesture, grit, and feeling were the
                        only real rules. That same eye that knew when a
                        painting was finished — and when it wasn&rsquo;t —
                        turned out to be exactly what product design
                        demanded. The same ear tuned to the tension and
                        release of a blues progression translated naturally
                        into the rhythm of a user journey.
                    </p>

                    <p className="font-serif italic text-2xl md:text-3xl text-rust-deep leading-snug py-4">
                        What began in the studio became something larger.
                    </p>

                    <p>
                        Today Durrell works as a product designer and the
                        liaison between idea, design, and vision for web
                        and mobile applications. His specialties include
                        UI/UX design, product design, animation creation,
                        and technical guidance for web and mobile
                        platforms. He doesn&rsquo;t just design screens —
                        he helps teams understand what they&rsquo;re really
                        building, and why it should feel the way it does.
                    </p>
                    <p>
                        At Second Life Software, he brings that full range
                        to every project. The painter&rsquo;s eye. The
                        musician&rsquo;s ear. The designer&rsquo;s
                        discipline. Good design, like a painting that stops
                        you cold or a guitar line that cuts right to the
                        bone, doesn&rsquo;t announce itself. It creates
                        conditions for something to be felt, understood,
                        and remembered.
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
