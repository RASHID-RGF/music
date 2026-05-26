import {
  Heart,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  Mic2,
  ListMusic,
  Maximize2,
} from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { formatDuration } from "@/lib/mock-data";

export function PlayerBar() {
  const p = usePlayer();
  const t = p.current;

  return (
    <div className="glass-strong fixed inset-x-3 bottom-3 z-40 rounded-2xl px-4 py-3 md:px-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: now playing */}
        <div className="flex min-w-0 items-center gap-3">
          {t ? (
            <>
              {t.cover ? (
                <img
                  src={t.cover}
                  alt=""
                  className="size-12 rounded-md object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="size-12 rounded-md bg-white/10 ring-1 ring-white/10" />
              )}

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{t.title}</div>
                <div className="truncate text-xs text-muted-foreground">{t.artist}</div>
              </div>
              <button
                onClick={() => p.toggleLike(t.id)}
                className={`ml-2 rounded-full p-2 transition hover:bg-white/10 ${p.isLiked(t.id) ? "text-[oklch(0.78_0.18_295)]" : "text-muted-foreground"}`}
                aria-label="Like"
              >
                <Heart className="size-4" fill={p.isLiked(t.id) ? "currentColor" : "none"} />
              </button>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">Pick a track to start vibing.</div>
          )}
        </div>

        {/* Center: controls + progress */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-foreground/80">
            <button className="rounded-full p-2 hover:text-white" aria-label="Shuffle">
              <Shuffle className="size-4" />
            </button>
            <button
              onClick={p.prev}
              className="rounded-full p-2 hover:text-white"
              aria-label="Previous"
            >
              <SkipBack className="size-5" />
            </button>
            <button
              onClick={p.toggle}
              className="grid size-10 place-items-center rounded-full bg-white text-black shadow-lg shadow-purple-500/20 transition hover:scale-105"
              aria-label={p.playing ? "Pause" : "Play"}
            >
              {p.playing ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5 translate-x-[1px]" />
              )}
            </button>
            <button
              onClick={p.next}
              className="rounded-full p-2 hover:text-white"
              aria-label="Next"
            >
              <SkipForward className="size-5" />
            </button>
            <button className="rounded-full p-2 hover:text-white" aria-label="Repeat">
              <Repeat className="size-4" />
            </button>
          </div>
          <div className="flex w-full max-w-[520px] items-center gap-2 text-[11px] tabular-nums text-muted-foreground">
            <span>{formatDuration(p.currentTime || 0)}</span>
            <ProgressBar value={p.progress} onChange={p.seek} />
            <span>{formatDuration(p.duration || (t?.duration ?? 0))}</span>
          </div>
        </div>

        {/* Right: extras */}
        <div className="flex items-center justify-end gap-1 text-muted-foreground">
          <button
            className="hidden rounded-full p-2 hover:bg-white/10 hover:text-white md:inline-flex"
            aria-label="Lyrics"
          >
            <Mic2 className="size-4" />
          </button>
          <button
            className="hidden rounded-full p-2 hover:bg-white/10 hover:text-white md:inline-flex"
            aria-label="Queue"
          >
            <ListMusic className="size-4" />
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <Volume2 className="size-4" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={p.volume}
              onChange={(e) => p.setVolume(parseFloat(e.target.value))}
              className="h-1 w-24 cursor-pointer accent-[oklch(0.78_0.18_295)]"
            />
          </div>
          <button
            className="rounded-full p-2 hover:bg-white/10 hover:text-white"
            aria-label="Fullscreen"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div
      className="group relative h-1 flex-1 cursor-pointer rounded-full bg-white/10"
      onClick={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        onChange((e.clientX - rect.left) / rect.width);
      }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-brand-gradient"
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}
