import { Link, useRouterState } from "@tanstack/react-router";
import { Headphones, Home, Search, Library, Plus, Heart, Radio, Sparkles } from "lucide-react";
import { playlists } from "@/lib/mock-data";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/search", label: "Search", icon: Search },
{ to: "/app/play-anything", label: "Play any", icon: Headphones },
  { to: "/app/library", label: "Your Library", icon: Library },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col gap-3 p-3 md:flex">
      <div className="glass rounded-2xl p-3">
        <div className="mb-4 flex items-center justify-between px-2 py-1">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo label="VibeFlow" />
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <n.icon className="size-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="glass flex min-h-0 flex-1 flex-col rounded-2xl p-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Playlists
          </span>
          <button
            className="rounded-md p-1 text-muted-foreground hover:bg-white/10 hover:text-white"
            aria-label="New playlist"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <Link
          to="/app/library"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-white/5"
        >
          <div className="grid size-9 place-items-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500">
            <Heart className="size-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="truncate">Liked Songs</div>
            <div className="text-xs text-muted-foreground">Playlist</div>
          </div>
        </Link>
        <Link
          to="/app/playlist/$id"
          params={{ id: "p1" }}
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5"
        >
          <div className="grid size-9 place-items-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-400">
            <Sparkles className="size-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="truncate">AI Daily Mix</div>
            <div className="text-xs text-muted-foreground">VibeFlow AI</div>
          </div>
        </Link>
        <div className="my-2 h-px bg-white/5" />
        <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pr-1">
          {playlists.map((pl) => {
            const active = path === `/app/playlist/${pl.id}`;
            return (
              <Link
                key={pl.id}
                to="/app/playlist/$id"
                params={{ id: pl.id }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <img src={pl.cover} alt="" className="size-9 rounded-md object-cover" />
                <div className="min-w-0">
                  <div className="truncate">{pl.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{pl.curator}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          to="/app/search"
          className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-white"
        >
          <Radio className="size-4" /> Discover new artists
        </Link>
      </div>
    </aside>
  );
}
