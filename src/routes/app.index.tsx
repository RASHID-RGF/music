import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/topbar";
import { MediaCard } from "@/components/media-card";
import { albums, artists, playlists, tracks, podcasts } from "@/lib/mock-data";
import { usePlayer } from "@/lib/player-context";
import { Play } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Home,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Still up?";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Home() {
  const p = usePlayer();
  const quickPicks = [
    playlists[0],
    playlists[1],
    playlists[2],
    playlists[3],
    albums[0],
    albums[3],
  ] as const;

  return (
    <div>
      <TopBar />
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{greeting()}</h1>

      {/* Quick picks grid */}
      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickPicks.map((item) => {
          const isPlaylist = "trackIds" in item && "curator" in item;
          const id = item.id;
          const cover = item.cover;
          const title = item.title;
          const trackIds = "trackIds" in item ? item.trackIds : [];
          const trackList = trackIds
            .map((tid: string) => tracks.find((t) => t.id === tid)!)
            .filter(Boolean);

          return (
            <Link
              key={id}
              to={isPlaylist ? "/app/playlist/$id" : "/app/album/$id"}
              params={{ id }}
              className="group flex items-center gap-3 overflow-hidden rounded-lg bg-white/[0.04] pr-3 transition hover:bg-white/10"
            >
              <img src={cover} alt="" className="size-16 object-cover" />
              <span className="flex-1 truncate text-sm font-semibold">{title}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  p.playQueue(trackList, 0);
                }}
                className="grid size-10 translate-x-2 place-items-center rounded-full bg-brand-gradient opacity-0 shadow-lg shadow-purple-700/40 transition group-hover:translate-x-0 group-hover:opacity-100"
              >
                <Play className="size-4 text-white" fill="white" />
              </button>
            </Link>
          );
        })}
      </div>

      <Section title="Made for you">
        {playlists.map((pl) => (
          <MediaCard
            key={pl.id}
            cover={pl.cover}
            title={pl.title}
            subtitle={pl.description}
            to="/app/playlist/$id"
            params={{ id: pl.id }}
            tracks={pl.trackIds.map((tid) => tracks.find((t) => t.id === tid)!).filter(Boolean)}
          />
        ))}
      </Section>

      <Section title="New releases">
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
      </Section>

      <Section title="Popular artists">
        {artists.map((ar) => (
          <MediaCard
            key={ar.id}
            cover={ar.image}
            title={ar.name}
            subtitle="Artist"
            to="/app/artist/$id"
            params={{ id: ar.id }}
            rounded="full"
          />
        ))}
      </Section>

      <Section title="Podcasts you'd love">
        {podcasts.map((pc) => (
          <MediaCard
            key={pc.id}
            cover={pc.cover}
            title={pc.title}
            subtitle={`Hosted by ${pc.host}`}
            to="/app"
          />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <button className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-white">
          Show all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {children}
      </div>
    </section>
  );
}
