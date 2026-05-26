import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Play, Clock } from "lucide-react";
import { TopBar } from "@/components/topbar";
import { TrackRow } from "@/components/track-row";
import { findAlbum, tracks } from "@/lib/mock-data";
import { usePlayer } from "@/lib/player-context";

export const Route = createFileRoute("/app/album/$id")({
  component: AlbumPage,
});

function AlbumPage() {
  const { id } = useParams({ from: "/app/album/$id" });
  const al = findAlbum(id);
  const p = usePlayer();
  if (!al) return <div className="p-10 text-muted-foreground">Album not found.</div>;
  const list = al.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean);

  return (
    <div>
      <TopBar />
      <div className="-mx-6 -mt-4 mb-6 bg-gradient-to-b from-blue-700/40 to-transparent px-6 pb-8 pt-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <img
            src={al.cover}
            alt=""
            className="size-48 rounded-lg object-cover shadow-2xl shadow-black/50"
          />
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Album</div>
            <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">{al.title}</h1>
            <div className="mt-3 text-sm text-muted-foreground">
              <Link
                to="/app/artist/$id"
                params={{ id: al.artistId }}
                className="font-semibold text-foreground hover:underline"
              >
                {al.artist}
              </Link>{" "}
              • {al.year} • {list.length} songs
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => p.playQueue(list, 0)}
            className="grid size-14 place-items-center rounded-full bg-brand-gradient shadow-xl shadow-purple-700/40 transition hover:scale-105"
            aria-label="Play"
          >
            <Play className="size-6 text-white" fill="white" />
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
