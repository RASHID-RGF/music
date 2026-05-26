import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TopBar } from "@/components/topbar";
import { MediaCard } from "@/components/media-card";
import { TrackRow } from "@/components/track-row";
import { albums, artists, playlists, tracks, type Track } from "@/lib/mock-data";

export const Route = createFileRoute("/app/search")({
  component: SearchPage,
});

const genres = [
  { name: "Pop", from: "from-pink-500", to: "to-fuchsia-600" },
  { name: "Hip-Hop", from: "from-amber-500", to: "to-red-600" },
  { name: "Electronic", from: "from-cyan-500", to: "to-blue-700" },
  { name: "Indie", from: "from-emerald-500", to: "to-teal-700" },
  { name: "R&B", from: "from-violet-500", to: "to-purple-700" },
  { name: "Jazz", from: "from-orange-500", to: "to-yellow-600" },
  { name: "Classical", from: "from-sky-500", to: "to-indigo-700" },
  { name: "Lo-Fi", from: "from-rose-500", to: "to-pink-700" },
];

type ExternalArtist = {
  id: string;
  name: string;
};

function formatExternalCover(src: string) {
  return src.replace(/100x100bb\.(jpg|png)$/, "600x600bb.$1");
}

function SearchPage() {
  const [q, setQ] = useState("");
  const [externalTracks, setExternalTracks] = useState<Track[]>([]);
  const [externalArtists, setExternalArtists] = useState<ExternalArtist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const query = q.trim().toLowerCase();

  useEffect(() => {
    if (!query) {
      setExternalTracks([]);
      setExternalArtists([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    setError(null);

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=24`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const hits = Array.isArray(data.results) ? data.results : [];
        const mapped: Track[] = hits
.filter((item: any) => item?.previewUrl)
          .map((item: any) => ({
            id: `itunes-${item.trackId ?? item.collectionId ?? item.trackName}-${item.artistName}`,
            title: item.trackName || item.collectionName || "Unknown title",
            artist: item.artistName || "Unknown artist",
            artistId: `itunes-artist-${item.artistId ?? item.artistName}`,
            album: item.collectionName || "Single",
            albumId: `itunes-album-${item.collectionId ?? item.trackId ?? item.collectionName}`,
            // iTunes song search returns short preview audio (previewUrl),
            // so it cannot be played for the full real track length.
            duration: Math.round((item.trackTimeMillis ?? 0) / 1000) || 0,
            cover: item.artworkUrl100 ? formatExternalCover(item.artworkUrl100) : "",
            audio: item.previewUrl,
          }));

        setExternalTracks(mapped);
        setExternalArtists(
          Array.from(
            new Map(
              mapped.map((track) => [track.artist, { id: track.artistId, name: track.artist }]),
            ).values(),
          ).slice(0, 12),
        );
      })
      .catch(() => {
        if (!active) return;
        setError("Unable to search external music right now.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query]);

  const results = useMemo(() => {
    if (!query) return null;

    return {
      tracks: [
        ...tracks.filter(
          (t) => t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query),
        ),
        ...externalTracks,
      ],
      artists: [
        ...artists.filter((a) => a.name.toLowerCase().includes(query)),
        ...externalArtists.map((artist) => ({ id: artist.id, name: artist.name })),
      ],
      albums: albums.filter(
        (a) => a.title.toLowerCase().includes(query) || a.artist.toLowerCase().includes(query),
      ),
      playlists: playlists.filter(
        (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      ),
    };
  }, [query, externalTracks, externalArtists]);

  return (
    <div>
      <TopBar />
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full rounded-full border border-white/10 bg-white/[0.05] py-3 pl-11 pr-4 text-sm outline-none ring-0 focus:border-white/20 focus:bg-white/[0.08]"
          />
        </div>
      </div>

      {!results && (
        <>
          <h2 className="mb-3 text-xl font-bold">Browse all</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {genres.map((g) => (
              <div
                key={g.name}
                className={`relative h-32 overflow-hidden rounded-xl bg-gradient-to-br ${g.from} ${g.to} p-4`}
              >
                <div className="text-lg font-bold drop-shadow">{g.name}</div>
                <div className="absolute -bottom-4 -right-4 size-24 rotate-12 rounded-lg bg-black/30" />
              </div>
            ))}
          </div>
        </>
      )}

      {results && (
        <div className="space-y-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="mb-1 text-xl font-bold">Search results</h2>
              <p className="text-sm text-muted-foreground">
                Searching local and real-world songs, plus preview playback for real tracks.
              </p>
            </div>
            {isLoading && <div className="text-sm text-muted-foreground">Loading music...</div>}
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
          )}

          {results.tracks.length > 0 && (
            <section>
              <h2 className="mb-2 text-xl font-bold">Songs</h2>
              <div className="rounded-xl bg-white/[0.02] p-2">
                {results.tracks.map((t, i) => (
                  <TrackRow key={t.id} track={t} index={i} queue={results.tracks} />
                ))}
              </div>
            </section>
          )}

          {results.artists.length > 0 && (
            <Section title="Artists">
              {results.artists.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl bg-white/[0.03] p-4 text-sm text-muted-foreground"
                >
                  <div className="font-semibold text-white">{a.name}</div>
                  <div className="mt-1 text-xs">Artist found in search results</div>
                </div>
              ))}
            </Section>
          )}

          {results.albums.length > 0 && (
            <Section title="Albums">
              {results.albums.map((al) => (
                <MediaCard
                  key={al.id}
                  cover={al.cover}
                  title={al.title}
                  subtitle={al.artist}
                  to="/app/album/$id"
                  params={{ id: al.id }}
                  tracks={al.trackIds
                    .map((tid) => tracks.find((t) => t.id === tid)!)
                    .filter(Boolean)}
                />
              ))}
            </Section>
          )}

          {results.playlists.length > 0 && (
            <Section title="Playlists">
              {results.playlists.map((p) => (
                <MediaCard
                  key={p.id}
                  cover={p.cover}
                  title={p.title}
                  subtitle={p.curator}
                  to="/app/playlist/$id"
                  params={{ id: p.id }}
                  tracks={p.trackIds
                    .map((tid) => tracks.find((t) => t.id === tid)!)
                    .filter(Boolean)}
                />
              ))}
            </Section>
          )}

          {results.tracks.length === 0 &&
            results.artists.length === 0 &&
            results.albums.length === 0 &&
            results.playlists.length === 0 && (
              <div className="rounded-xl bg-white/[0.03] p-8 text-center text-sm text-muted-foreground">
                No results for "<span className="text-white">{q}</span>". Try a different search.
              </div>
            )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {children}
      </div>
    </section>
  );
}
