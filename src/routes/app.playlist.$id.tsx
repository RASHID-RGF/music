import { createFileRoute, useParams } from "@tanstack/react-router";
import { Play, Heart, Clock } from "lucide-react";
import { TopBar } from "@/components/topbar";
import { TrackRow } from "@/components/track-row";
import { findPlaylist, tracks } from "@/lib/mock-data";
import { usePlayer } from "@/lib/player-context";

export const Route = createFileRoute("/app/playlist/$id")({
  component: PlaylistPage,
});

function PlaylistPage() {
  const { id } = useParams({ from: "/app/playlist/$id" });
  const pl = findPlaylist(id);
  const p = usePlayer();
  if (!pl) return <div className="p-10 text-muted-foreground">Playlist not found.</div>;
  const list = pl.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean);

  return (
    <div>
      <TopBar />
      <div className="-mx-6 -mt-4 mb-6 bg-gradient-to-b from-purple-700/40 to-transparent px-6 pb-8 pt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <img
            src={pl.cover}
            alt=""
            className="size-48 rounded-lg object-cover shadow-2xl shadow-black/50"
          />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Playlist</div>
            <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">{pl.title}</h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{pl.description}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              {pl.curator} • {list.length} songs
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => p.playQueue(list, 0)}
            className="grid size-14 place-items-center rounded-full bg-brand-gradient shadow-xl shadow-purple-700/40 transition hover:scale-105"
            aria-label="Play"
          >
            <Play className="size-6 text-white" fill="white" />
          </button>
          <button
            className="rounded-full border border-white/10 p-3 text-muted-foreground hover:text-white"
            aria-label="Like"
          >
            <Heart className="size-5" />
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.02] p-2">
        <div className="grid grid-cols-[2rem_1fr_auto_3rem] gap-3 border-b border-white/5 px-3 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground md:grid-cols-[2rem_1fr_1fr_auto_3rem]">
          <div>#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div />
          <div className="justify-self-end">
            <Clock className="size-3.5" />
          </div>
        </div>
        {list.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} queue={list} />
        ))}
      </div>
    </div>
  );
}
