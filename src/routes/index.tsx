import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Headphones,
  Sparkles,
  Radio,
  Mic2,
  Download,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "VibeFlow — Feel Every Beat" },
      {
        name: "description",
        content:
          "VibeFlow is a premium AI-powered music streaming experience. Discover, listen, and share music you love.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(88,128,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,199,0.12),_transparent_35%),linear-gradient(180deg,_#05070f,_#090c18)] text-white">
      <Nav />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 lg:py-16">
        <Hero />
        <Trusted />
        <Features />
        <Spotlight />
        <Plans />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 shadow-lg shadow-black/30">
            <span className="text-lg font-black text-white">V</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.16em] text-white">VibeFlow</div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">Music that moves</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#spotlight" className="hover:text-white transition">
            Spotlight
          </a>
          <a href="#plans" className="hover:text-white transition">
            Plans
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
          >
            Open app
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground shadow-lg shadow-black/10">
          <Sparkles className="size-4 text-cyan-300" />
          AI-powered music for every mood
        </div>

        <div className="space-y-6">
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-6xl">
            Modern audio for the way you move.
          </h1>
          <p className="max-w-xl text-lg text-slate-300 sm:text-xl">
            Discover curated playlists, lossless streaming, and immersive social listening — all wrapped in a sleek experience built for real music lovers.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5"
          >
            Start listening
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Compare plans
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-xl md:max-w-md">
          <Stat title="4.9/5" subtitle="App Store rating" />
          <Stat title="120M+" subtitle="tracks available" />
          <Stat title="99.99%" subtitle="uptime guarantee" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="absolute inset-x-0 -top-10 h-44 rounded-br-[5rem] bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl" />
        <div className="relative grid gap-5">
          <div className="flex items-start justify-between gap-4 rounded-3xl bg-slate-950/80 p-6 shadow-inner shadow-black/20">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-cyan-300">Live session</div>
              <div className="mt-3 text-2xl font-semibold text-white">VibeFlow Radio</div>
              <div className="mt-2 text-sm text-slate-400">24/7 curated beats with AI-powered flow.</div>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white/10 text-cyan-300">
              <Play className="size-5" />
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl bg-slate-950/80 p-5 text-white shadow-inner shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Now playing</div>
                <div className="mt-2 text-lg font-semibold">Midnight Drive</div>
                <div className="text-sm text-slate-400">by Nova Lux</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-cyan-500/15 text-cyan-300">
                <Play className="size-5" />
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.18em] text-slate-500">
              <span>03:38</span>
              <span>LOFI</span>
              <span>HQ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-1 rounded-3xl bg-white/5 p-4 text-center transition hover:bg-white/10">
      <div className="text-2xl font-semibold text-white">{title}</div>
      <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{subtitle}</div>
    </div>
  );
}

function Trusted() {
  return (
    <section className="mx-auto mt-20 max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-3">
        <Brand value="Top charts" label="curated daily" />
        <Brand value="Live rooms" label="audio communities" />
        <Brand value="AI matches" label="mood discovery" />
      </div>
    </section>
  );
}

function Brand({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
        <CheckCircle2 className="size-4" />
        Verified
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <p className="text-sm text-slate-400">{label} for every playlist, genre, and moment.</p>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: Sparkles,
      title: "AI Daily Mixes",
      desc: "Every morning, fresh playlists created from what you love.",
    },
    {
      icon: Radio,
      title: "Lossless HiFi",
      desc: "Studio-grade streaming with clear, dynamic audio.",
    },
    {
      icon: Mic2,
      title: "Podcasts & Live",
      desc: "Listen to creators, live rooms, and exclusive sessions.",
    },
    {
      icon: Download,
      title: "Offline anywhere",
      desc: "Save playlists for travel, workouts, and mess-free listening.",
    },
    {
      icon: Users,
      title: "Social listening",
      desc: "Share with friends and discover communities around music.",
    },
    {
      icon: Headphones,
      title: "Every device",
      desc: "Web, mobile, desktop, and car audio with fast sync.",
    },
  ];

  return (
    <section id="features" className="mt-20 grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="group rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900/80"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-cyan-300 transition group-hover:bg-cyan-400/10">
            <item.icon className="size-6" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

function Spotlight() {
  const cards = [
    { title: "Global Chill", subtitle: "Mellow tracks for late nights", accent: "from deep house to ambient" },
    { title: "Hyper Pop", subtitle: "The brightest, boldest playlists", accent: "new releases every day" },
    { title: "Workout Pulse", subtitle: "Keep the energy high", accent: "perfect for gym and runs" },
  ];

  return (
    <section id="spotlight" className="mt-20 grid gap-6 lg:grid-cols-3">
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">Spotlight</span>
        <h2 className="text-4xl font-bold tracking-tight text-white">Curated playlists that feel alive.</h2>
        <p className="max-w-md text-slate-400">
          Each mix is handcrafted with AI and human taste, delivering real flow that keeps you moving.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:scale-[1.01] hover:border-cyan-300/30"
          >
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">{card.accent}</div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Plans() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic listening with ads and shuffle.",
      highlight: ["Ad-supported streaming", "Standard audio", "Shuffle play"],
      action: "Start free",
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Unlimited music, hi-fi sound, offline access.",
      highlight: ["Ad-free experience", "Lossless HiFi", "Offline mode", "Unlimited skips"],
      action: "Go Premium",
      featured: true,
    },
    {
      name: "Family",
      price: "$15.99",
      description: "Six accounts for the whole household.",
      highlight: ["Up to 6 accounts", "Family playlists", "Parental controls"],
      action: "Get Family",
    },
  ];

  return (
    <section id="plans" className="mt-24 rounded-[3rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-3 lg:items-end">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">Plans</span>
          <h2 className="text-4xl font-bold tracking-tight text-white">Choose the plan that fits your tempo.</h2>
          <p className="max-w-md text-slate-400">
            Start free or upgrade for premium sound and offline access. Everything works instantly across all your devices.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2rem] border p-6 transition ${
                plan.featured
                  ? "border-cyan-300/40 bg-slate-950/90 shadow-xl shadow-cyan-500/10"
                  : "border-white/10 bg-slate-950/80"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-cyan-300">{plan.name}</div>
                  <div className="mt-4 text-4xl font-bold text-white">{plan.price}</div>
                </div>
                {plan.featured && (
                  <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">Popular</div>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-400">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.highlight.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured ? "bg-cyan-400 text-slate-950" : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {plan.action}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-3xl bg-cyan-400/10 text-cyan-300">V</div>
          <div>
            <p className="font-semibold text-white">VibeFlow</p>
            <p className="text-slate-500">Modern music streaming made simple.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <a href="#" className="transition hover:text-white">
            Privacy
          </a>
          <a href="#" className="transition hover:text-white">
            Terms
          </a>
          <a href="#" className="transition hover:text-white">
            Support
          </a>
          <span>© {new Date().getFullYear()} VibeFlow</span>
        </div>
      </div>
    </footer>
  );
}
