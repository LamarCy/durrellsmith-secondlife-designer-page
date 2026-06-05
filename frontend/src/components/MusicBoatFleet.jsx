import React, { useEffect, useState } from "react";

/* ============================================================================
   MusicBoatFleet — paper sailboats representing each SoundCloud track.

   Each track becomes a folded-paper sailboat silhouette (triangular sail
   above a hull, via clip-path) sailing across the page from left to right.
   The track's SoundCloud artwork is painted across the sail and hull. Click
   a boat to open the SoundCloud player in a modal.

   List is fetched from the user's SoundCloud podcast RSS feed on mount, with
   a CORS-proxy fallback chain + cache-buster so freshly-published tracks
   show up on the next page load.

   User ID: 47204335 (Durrell Lamar — https://soundcloud.com/durrell-smith)
   ========================================================================== */

const SOUNDCLOUD_USER_ID = "47204335";
const SOUNDCLOUD_PROFILE = "https://soundcloud.com/durrell-smith";

function rssUrl() {
    return `https://feeds.soundcloud.com/users/soundcloud:users:${SOUNDCLOUD_USER_ID}/sounds.rss?_=${Date.now()}`;
}

const FETCHERS = [
    (url) => url,
    (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

async function fetchSoundcloudTracks() {
    const url = rssUrl();
    for (const wrap of FETCHERS) {
        try {
            const res = await fetch(wrap(url), { cache: "no-store" });
            if (!res.ok) continue;
            const text = await res.text();
            const xml = new DOMParser().parseFromString(text, "text/xml");
            if (xml.querySelector("parsererror")) continue;
            const items = [...xml.querySelectorAll("item")];
            return items.map((item) => {
                const itunesImg = item.getElementsByTagName(
                    "itunes:image",
                )[0];
                const enclosure = item.querySelector("enclosure");
                return {
                    title:
                        item.querySelector("title")?.textContent?.trim() ||
                        "Untitled",
                    link:
                        item.querySelector("link")?.textContent?.trim() ||
                        SOUNDCLOUD_PROFILE,
                    pubDate:
                        item.querySelector("pubDate")?.textContent?.trim() ||
                        "",
                    img:
                        itunesImg?.getAttribute("href") ||
                        enclosure?.getAttribute("url") ||
                        "",
                };
            });
        } catch (e) {
            // try the next fetcher
        }
    }
    throw new Error("All fetchers failed");
}

/* ---------- PaperBoat ----------------------------------------------- */

function PaperBoat({ track, idx, onPlay }) {
    // Sail across the page with varied speeds + altitudes. Deterministic
    // so the motion stays stable across re-renders.
    const speed = 30 + (idx % 5) * 7; // 30 – 58 s per lap
    const lane = (idx % 4) * 30; // 4 stacked vertical lanes
    const phase = ((idx * 37) % 100) / 100;
    const delay = -(speed * phase).toFixed(2);
    // Hull "bobs" on imagined waves; period varied per boat
    const bobDur = (1.6 + ((idx * 13) % 60) / 100).toFixed(2);
    const bobDelay = (-((idx * 17) % 100) / 100).toFixed(2);
    // Friendly fallback sail tints — bright candy colors for the sails
    const fallbackHues = [
        "#c4432c",
        "#e8a094",
        "#d68a6e",
        "#9b6dff",
        "#5b8def",
        "#f3d36b",
    ];
    const sailTint = fallbackHues[idx % fallbackHues.length];

    return (
        <button
            type="button"
            className="paper-boat"
            onClick={() => onPlay(track)}
            aria-label={`Play ${track.title}`}
            style={{
                "--boat-speed": `${speed}s`,
                "--boat-delay": `${delay}s`,
                "--boat-lane": `${lane}px`,
                "--boat-bob-dur": `${bobDur}s`,
                "--boat-bob-delay": `${bobDelay}s`,
                "--boat-tint": sailTint,
            }}
        >
            <div className="paper-boat-body">
                {track.img ? (
                    <img
                        src={track.img}
                        alt=""
                        loading="lazy"
                        className="paper-boat-img"
                    />
                ) : (
                    <div className="paper-boat-tint" />
                )}
                {/* mast — vertical crease running down the sail */}
                <div className="paper-boat-mast" />
                {/* sail fold — diagonal crease so the sail looks folded */}
                <div className="paper-boat-fold" />
                {/* paper sheen — front side catches light, back is shadowed */}
                <div className="paper-boat-sheen" />
                {/* hull water-line — a faint line at the deck where sail meets hull */}
                <div className="paper-boat-waterline" />
                {/* tiny flag at the top of the mast */}
                <div className="paper-boat-flag" />
            </div>
            <div className="paper-boat-label">
                <span>{track.title}</span>
            </div>
        </button>
    );
}

/* ---------- Player modal ----------------------------------------------- */

function PlayerModal({ track, onClose }) {
    if (!track) return null;
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        track.link,
    )}&color=%23c4432c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true`;
    return (
        <div
            className="music-modal-backdrop"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="music-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="music-modal-close"
                    onClick={onClose}
                    aria-label="Close player"
                >
                    ×
                </button>
                <div className="music-modal-title">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-2">
                        Now playing
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-ink leading-snug">
                        {track.title}
                    </h3>
                </div>
                <iframe
                    title={track.title}
                    src={embedUrl}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay"
                />
            </div>
        </div>
    );
}

/* ---------- The fleet --------------------------------------------------- */

export default function MusicBoatFleet() {
    const [tracks, setTracks] = useState([]);
    const [status, setStatus] = useState("loading");
    const [active, setActive] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const list = await fetchSoundcloudTracks();
                if (cancelled) return;
                if (!list.length) {
                    setStatus("empty");
                    return;
                }
                setTracks(list);
                setStatus("loaded");
            } catch (e) {
                if (!cancelled) setStatus("error");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    if (status === "loading") {
        return (
            <div className="rounded-2xl border border-ink/15 bg-sand/40 p-10 md:p-14 text-center mx-auto max-w-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-3">
                    Hoisting the sails…
                </div>
                <p className="font-sans text-sm text-ink-soft">
                    Pulling the latest from SoundCloud.
                </p>
            </div>
        );
    }

    if (status === "empty" || status === "error" || !tracks.length) {
        return (
            <div className="rounded-2xl border border-ink/15 bg-sand/40 p-10 md:p-14 text-center mx-auto max-w-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-rust mb-3">
                    The harbor is still — for now
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-ink leading-[1.05]">
                    New songs set sail here as new paper boats.
                </h3>
                <p className="mt-4 font-sans text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                    This page is wired into{" "}
                    <a
                        href={SOUNDCLOUD_PROFILE}
                        target="_blank"
                        rel="noreferrer"
                        className="text-rust hover:underline"
                    >
                        Durrell&rsquo;s SoundCloud feed
                    </a>
                    . Publish a track and a new boat launches into the
                    fleet next time the page loads.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="paper-boat-fleet">
                {tracks.map((t, i) => (
                    <PaperBoat
                        key={t.link + i}
                        track={t}
                        idx={i}
                        onPlay={setActive}
                    />
                ))}
            </div>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft text-center">
                {tracks.length} sound{tracks.length === 1 ? "" : "s"} live
                from{" "}
                <a
                    href={SOUNDCLOUD_PROFILE}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rust hover:underline"
                >
                    soundcloud.com/durrell-smith
                </a>
            </div>
            <PlayerModal
                track={active}
                onClose={() => setActive(null)}
            />
        </>
    );
}
