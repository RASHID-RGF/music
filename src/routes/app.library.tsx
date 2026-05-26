import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Play } from "lucide-react";
import { TopBar } from "@/components/topbar";
import { MediaCard } from "@/components/media-card";
import { TrackRow } from "@/components/track-row";
import { albums, artists, playlists, tracks } from "@/lib/mock-data";
import { usePlayer } from "@/lib/player-context";

export const Route = createFileRoute("/app/library")({
  component: Library,
});

type Tab = "playlists" | "albums" | "artists" | "liked";

function Library() {
  const [tab, setTab] = useState<Tab>("playlists");
  const p = usePlayer();
  const likedTracks = tracks.filter((t) => p.isLiked(t.id));

  return (
    <div>
      <TopBar />
      <div className="mb-6 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Library</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["playlists", "albums", "artists", "liked"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
              tab === t
                ? "bg-white text-black"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            }`}
          >
            {t === "liked" ? "Liked songs" : t}
          </button>
        ))}
      </div>

      {tab === "playlists" && (
        <Grid>
          <Link
            to="/app/library"
            className="group flex flex-col rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-4 transition hover:scale-[1.01]"
          >
            <div className="grid aspect-square w-full place-items-center rounded-lg bg-white/10">
              <Heart className="size-10 text-white" fill="white" />
            </div>
            <div className="mt-3 text-sm font-bold">Liked Songs</div>
            <div className="text-xs text-white/70">{likedTracks.length} songs</div>
          </Link>
          {playlists.map((pl) => (
            <MediaCard
              key={pl.id}
              cover={pl.cover}
              title={pl.title}
              subtitle={pl.curator}
              to="/app/playlist/$id"
              params={{ id: pl.id }}
              tracks={pl.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean)}
            />
          ))}
        </Grid>
      )}

      {tab === "albums" && (
        <Grid>
          {albums.map((al) => (
            <MediaCard
              key={al.id}
              cover={al.cover}
              title={al.title}
              subtitle={`${al.artist} • ${al.year}`}
              to="/app/album/$id"
              params={{ id: al.id }}
              tracks={al.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean)}
            />
          ))}
        </Grid>
      )}

      {tab === "artists" && (
        <Grid>
          {artists.map((a) => (
            <MediaCard
              key={a.id}
              cover={a.image}
              title={a.name}
              subtitle="Artist"
              to="/app/artist/$id"
              params={{ id: a.id }}
              rounded="full"
            />
          ))}
        </Grid>
      )}

      {tab === "liked" && (
        <div className="rounded-2xl bg-gradient-to-b from-purple-700/40 to-transparent p-6">
          <div className="mb-6 flex items-end gap-5">
            <div className="grid size-40 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-2xl">
              <Heart className="size-16 text-white" fill="white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Playlist
              </div>
              <h2 className="text-4xl font-bold">Liked Songs</h2>
              <div className="mt-2 text-sm text-muted-foreground">{likedTracks.length} songs</div>
            </div>
          </div>
          {likedTracks.length === 0 ? (
            <div className="rounded-xl bg-white/[0.03] p-8 text-center text-sm text-muted-foreground">
              Tap the heart on any song to save it here.
            </div>
          ) : (
            <div className="rounded-xl bg-white/[0.02] p-2">
              <button
                onClick={() => p.playQueue(likedTracks, 0)}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2 text-sm font-semibold text-white"
              >
                <Play className="size-4" fill="white" /> Play all
              </button>
              {likedTracks.map((t, i) => (
                <TrackRow key={t.id} track={t} index={i} queue={likedTracks} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {children}
    </div>
  );
}
