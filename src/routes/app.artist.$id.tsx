import { createFileRoute, useParams } from "@tanstack/react-router";
import { Play, BadgeCheck } from "lucide-react";
import { TopBar } from "@/components/topbar";
import { TrackRow } from "@/components/track-row";
import { MediaCard } from "@/components/media-card";
import { albums, findArtist, tracks } from "@/lib/mock-data";
import { usePlayer } from "@/lib/player-context";

export const Route = createFileRoute("/app/artist/$id")({
  component: ArtistPage,
});

function ArtistPage() {
  const { id } = useParams({ from: "/app/artist/$id" });
  const artist = findArtist(id);
  const p = usePlayer();
  if (!artist) return <div className="p-10 text-muted-foreground">Artist not found.</div>;
  const artistTracks = tracks.filter((t) => t.artistId === id);
  const artistAlbums = albums.filter((a) => a.artistId === id);

  return (
    <div>
      <TopBar />
      <div className="relative -mx-6 -mt-4 mb-6 h-72 overflow-hidden">
        <img src={artist.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2 text-xs">
            <BadgeCheck className="size-4 text-[oklch(0.65_0.22_250)]" />
            <span className="text-muted-foreground">Verified artist</span>
          </div>
          <h1 className="mt-1 text-6xl font-bold tracking-tight drop-shadow-lg">{artist.name}</h1>
          <div className="mt-2 text-sm text-muted-foreground">
            {artist.monthlyListeners.toLocaleString()} monthly listeners
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => p.playQueue(artistTracks, 0)}
          className="grid size-14 place-items-center rounded-full bg-brand-gradient shadow-xl shadow-purple-700/40"
          aria-label="Play"
        >
          <Play className="size-6 text-white" fill="white" />
        </button>
        <button className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold hover:bg-white/10">
          Follow
        </button>
      </div>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">Popular</h2>
        <div className="rounded-xl bg-white/[0.02] p-2">
          {artistTracks.slice(0, 5).map((t, i) => (
            <TrackRow key={t.id} track={t} index={i} queue={artistTracks} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">Discography</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {artistAlbums.map((al) => (
            <MediaCard
              key={al.id}
              cover={al.cover}
              title={al.title}
              subtitle={`${al.year} • Album`}
              to="/app/album/$id"
              params={{ id: al.id }}
              tracks={al.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean)}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">About</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{artist.bio}</p>
      </section>
    </div>
  );
}
