import { Heart, Pause, Play } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { formatDuration, type Track } from "@/lib/mock-data";

export function TrackRow({ track, index, queue }: { track: Track; index: number; queue: Track[] }) {
  const p = usePlayer();
  const isCurrent = p.current?.id === track.id;
  const liked = p.isLiked(track.id);

  return (
    <div
      className={`group grid grid-cols-[2rem_1fr_auto_3rem] items-center gap-3 rounded-md px-3 py-2 text-sm transition hover:bg-white/5 md:grid-cols-[2rem_1fr_1fr_auto_3rem] ${
        isCurrent ? "text-white" : ""
      }`}
    >
      <button
        onClick={() => p.playQueue(queue, index)}
        className="grid size-7 place-items-center rounded-md text-muted-foreground"
        aria-label="Play"
      >
        <span className="group-hover:hidden tabular-nums">
          {isCurrent && p.playing ? "♪" : index + 1}
        </span>
        <span className="hidden group-hover:inline-flex">
          {isCurrent && p.playing ? (
            <Pause className="size-4 text-white" />
          ) : (
            <Play className="size-4 text-white" />
          )}
        </span>
      </button>
      <div className="flex min-w-0 items-center gap-3">
        <img src={track.cover} alt="" className="size-10 rounded object-cover" />
        <div className="min-w-0">
          <div
            className={`truncate ${isCurrent ? "text-[oklch(0.78_0.18_295)]" : "text-foreground"}`}
          >
            {track.title}
          </div>
          <div className="truncate text-xs text-muted-foreground">{track.artist}</div>
        </div>
      </div>
      <div className="hidden truncate text-muted-foreground md:block">{track.album}</div>
      <button
        onClick={() => p.toggleLike(track.id)}
        className={`opacity-0 transition group-hover:opacity-100 ${liked ? "text-[oklch(0.78_0.18_295)] opacity-100" : "text-muted-foreground"}`}
        aria-label="Like"
      >
        <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
      </button>
      <div className="text-right tabular-nums text-muted-foreground">
        {formatDuration(track.duration)}
      </div>
    </div>
  );
}
