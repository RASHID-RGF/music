import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import type { Track } from "@/lib/mock-data";

type Props = {
  cover: string;
  title: string;
  subtitle: string;
  to: string;
  params?: Record<string, string>;
  rounded?: "md" | "full";
  tracks?: Track[];
};

export function MediaCard({ cover, title, subtitle, to, params, rounded = "md", tracks }: Props) {
  const player = usePlayer();
  return (
    <Link
      to={to as unknown as string}
      params={params as unknown as Record<string, unknown>}
      className="group relative block rounded-xl bg-white/[0.03] p-3 transition hover:bg-white/[0.07]"
    >
      <div className="relative">
        <img
          src={cover}
          alt=""
          className={`aspect-square w-full object-cover shadow-lg shadow-black/40 ${rounded === "full" ? "rounded-full" : "rounded-lg"}`}
        />
        {tracks && tracks.length > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              player.playQueue(tracks, 0);
            }}
            className="absolute bottom-2 right-2 grid size-11 translate-y-2 place-items-center rounded-full bg-brand-gradient opacity-0 shadow-xl shadow-purple-700/40 transition group-hover:translate-y-0 group-hover:opacity-100"
            aria-label="Play"
          >
            <Play className="size-5 translate-x-[1px] text-white" fill="white" />
          </button>
        )}
      </div>
      <div className="mt-3">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </Link>
  );
}
